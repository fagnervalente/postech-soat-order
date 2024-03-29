import { Order, OrderPaymentStatus, OrderStatus } from "@entities/Order";
import schema from "@validation/createOrderBody";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "./AbstractUseCase";
import Calculator from "src/domain/rules/Calculator";
import IOrderQueueOUT from "@ports/IOrderQueueOUT";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly repository: IOrderRepository, readonly orderQueueOUT: IOrderQueueOUT) {
		super(repository);
	}

	public async execute(order: Order): Promise<Order | null> {
		const orderCustomer = await this.getParsedCustomer(order);
		const orderProducts = await this.getParsedProducts(order);

		this.validateSchema(schema, order);

		if (this.hasErrors()) {
			return null;
		}

		order.customerId = orderCustomer;
		order.products = orderProducts!;
		
		order.status = OrderStatus.RECEBIDO;
		order.paymentStatus = OrderPaymentStatus.AGUARDANDO;

		const orderCreated = await this.repository.save(order);

		if (orderCreated == null) {
			return Promise.reject(null);
		}
		try {
			this.orderQueueOUT.publishToCreated({ orderId: orderCreated.id, amount: orderCreated.totalPrice, description: "" });
		} catch (e) {
			console.error(e);
			this.repository.deleteById(orderCreated.id!)
			return Promise.reject({ message: "Pedido removido, não foi possível adicionar na fila!" })
		}

		return Promise.resolve(orderCreated);
	}

	private async getParsedCustomer(order: Order): Promise<string | undefined> {
		if (!order.customerId && order.customerId?.length === 0) {
			// Usar GET de Users para verificar se o usuário existe, se sim, retornar o cpf informado como referência
		}

		return order.customerId;
	}

	private async getParsedProducts(order: Order): Promise<number[] | undefined> {
		let productValues: number[] = [];
		order.totalPrice = Calculator.calculateOrderTotalPrice(productValues);

		// Usar GET de Products para verificar se os produtos existem
		return order.products;
	}
}