import { Order, OrderPaymentStatus, OrderStatus } from "@entities/Order";
import CreateUseCase from "@useCases/CreateUseCase";
import IOrderRepository from "../ports/IOrderRepository";
import GetByIdUseCase from "@useCases/GetByIdUseCase";
import ListUseCase from "@useCases/ListUseCase";
import UpdateStatusUseCase from "@useCases/UpdateStatusUseCase";
import UpdatePaymentStatusUseCase from "@useCases/UpdatePaymentStatusUseCase";
import IOrderQueue from "@ports/IOrderQueue";

export default class OrderController {
	static async checkout(products: Array<number>, cpf: string, orderRepository: IOrderRepository, orderQueue: IOrderQueue) {
		const createUseCase = new CreateUseCase(orderRepository, orderQueue);
		const result = await createUseCase.execute({ products, customerId: cpf } as Order);

		if (createUseCase.hasErrors()) throw createUseCase.getErrors();

		return { Pedido: result?.id };
	}

	static async list(orderRepository: IOrderRepository) {
		const listOrder = new ListUseCase(orderRepository);
		const result = await listOrder.execute();

		if (listOrder.hasErrors()) throw listOrder.getErrors();

		return result;
	}

	static async getByPaymentStatus(orderId: string, orderRepository: IOrderRepository) {
		const getPaymentStatus = new GetByIdUseCase(orderRepository);
		const result = await getPaymentStatus.execute(orderId);

		if (getPaymentStatus.hasErrors()) throw getPaymentStatus.getErrors();

		return result;
	}

	static async updateStatus(orderId: string, orderStatus: OrderStatus, orderRepository: IOrderRepository) {
		const updateStatusUseCase = new UpdateStatusUseCase(orderRepository);

		await updateStatusUseCase.execute(orderId, orderStatus);

		if (updateStatusUseCase.hasErrors()) {
			throw updateStatusUseCase.getErrors();
		}
	}

	static async updatePaymentStatus(orderId: string, paymentStatus: OrderPaymentStatus, orderRepository: IOrderRepository) {
		const updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(orderRepository);

		await updatePaymentStatusUseCase.execute(orderId, paymentStatus);

		if (updatePaymentStatusUseCase.hasErrors()) {
			throw updatePaymentStatusUseCase.getErrors();
		}
	}
}