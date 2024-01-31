import { Order, OrderPaymentStatus } from "@entities/Order";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class UpdatePaymentStatusUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderRepository) {
		super(orderRepository);
	}

	async execute(orderId: string, paymentStatus: OrderPaymentStatus): Promise<Order | null> {
		const order = await this.validateOrder(orderId);
		this.validateStatus(paymentStatus);

		if (this.hasErrors()) return null;

		order!.paymentStatus = paymentStatus;

		return await this.orderRepository.save(order!);
	}

	private async validateOrder(id: string): Promise<Order | null> {
		const found = await this.orderRepository.findById(id);
		if (!found) this.setError({ message: "Order not found" });
		return found;
	}

	private async validateStatus(status: OrderPaymentStatus | null) {
		if (status === null) this.setError({ message: "Invalid payment status" });
	}
}