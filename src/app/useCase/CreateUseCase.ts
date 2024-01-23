import { Order, OrderPaymentStatus } from "@entities/Order";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "./AbstractUseCase";
import Calculator from "src/domain/rules/Calculator";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly repository: IOrderRepository) {
		super(repository);
	}

	public async execute(order: Order): Promise<Order | null> {
		const orderCustomer = await this.getParsedCustomer(order);
		const orderProducts = await this.getParsedProducts(order);

		if (this.hasErrors()) {
			return null;
		}

		order.customerId = orderCustomer;
		order.products = orderProducts!;
		// checkout mockado
		order.paymentStatus = OrderPaymentStatus.APROVADO;

		// Persistir o pedido e usar POST de Payment para executar o pagamento
		return await this.repository.save(order);
	}

	private async getParsedCustomer(order: Order): Promise<string | undefined> {
		if (!order.customerId && order.customerId?.length === 0) {
			// Usar GET de Users para verificar se o usuário existe, se sim, retornar o cpf informado como referência
		}

		return undefined;
	}

	private async getParsedProducts(order: Order): Promise<number[] | undefined> {
		if (!order.products || order.products.length === 0) {
			this.setError({ message: "Order must have at least one product" });
			return undefined;
		}

		let productValues: number[] = [];
		order.totalPrice = Calculator.calculateOrderTotalPrice(productValues);

		// Usar GET de Products para verificar se os produtos existem
		return order.products;
	}
}