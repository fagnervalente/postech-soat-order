import { Order, OrderStatus } from "@entities/Order";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class UpdateStatusUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderRepository) {
		super(orderRepository);
	}

	async execute(orderId: number, status: OrderStatus): Promise<Order | null> {
		this.validateOrder(orderId);
		this.validateStatus(status);

		if (this.hasErrors()) {
			return null;
		}

		const order = await this.orderRepository.findById(orderId);
		order!.status = status!;

		return await this.orderRepository.save(order!);
	}

	private async validateOrder(id: number) {
		const found = await this.orderRepository.findById(id);
		if (!found) this.setError({ message: "Order not found" });
	}

	private async validateStatus(status: OrderStatus | null) {
		if (status === null) this.setError({ message: "Invalid order status" });
	}
}