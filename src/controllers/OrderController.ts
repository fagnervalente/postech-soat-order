import { Order } from "@entities/Order";
import CreateUseCase from "@useCases/CreateUseCase";
import IOrderRepository from "../ports/IOrderRepository";

export default class OrderController {
	static async checkout(products: Array<number>, cpf: string, orderRepository: IOrderRepository) {
		const createUseCase = new CreateUseCase(orderRepository);
		const result = await createUseCase.execute({ products, customerId: cpf } as Order);

		if (createUseCase.hasErrors()) throw createUseCase.getErrors();

		return { Pedido: result?.id };
	}

	// static async list(orderRepository: IOrderRepository) {
	// 	const listOrder = new ListUseCase(orderRepository);
	// 	const result = await listOrder.execute();

	// 	if (listOrder.hasErrors()) throw listOrder.getErrors();

	// 	return result;
	// }

	// static async handlePaymentWebhook(orderId: number, paymentStatusGateway: IPaymentStatusGateway, orderRepository: IOrderRepository) {
	// 	const updatePaymentStatus = new UpdatePaymentStatusUseCase(orderRepository);

	// 	await updatePaymentStatus.execute(orderId, paymentStatusGateway);

	// 	if (updatePaymentStatus.hasErrors()) throw updatePaymentStatus.getErrors();
	// }

	// static async getPaymentStatus(orderId: number, orderRepository: IOrderRepository) {
	// 	const getPaymentStatus = new GetOrderPaymentStatus(orderRepository);
	// 	const result = await getPaymentStatus.execute(orderId);

	// 	if (getPaymentStatus.hasErrors()) throw getPaymentStatus.getErrors();

	// 	return result;
	// }

	// static async updateStatus(orderId: number, orderStatus: OrderStatus, orderRepository: IOrderRepository) {
	// 	const updateStatusUseCase = new UpdateStatusUseCase(orderRepository);

	// 	await updateStatusUseCase.execute(orderId, orderStatus);

	// 	if (updateStatusUseCase.hasErrors()) {
	// 		throw updateStatusUseCase.getErrors();
	// 	}
	// }
}