import { OrderPaymentStatus } from "@entities/Order";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class GetByIdUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderRepository) {
		super(orderRepository);
	}

	async execute(orderId: string): Promise<OrderPaymentStatus | null> {
		const order = await this.orderRepository.findById(orderId);
		if (!order) this.setError({ message: "Order not found" });

		return order?.paymentStatus || null;
	}
}