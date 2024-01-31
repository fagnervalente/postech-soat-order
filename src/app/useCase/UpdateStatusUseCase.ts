import { Order, OrderStatus } from "@entities/Order";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class UpdateStatusUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderRepository) {
		super(orderRepository);
	}

	async execute(orderId: string, status: OrderStatus): Promise<Order | null> {
		const order = await this.validateOrder(orderId);
		this.validateStatus(status);

		if (this.hasErrors()) {
			return null;
		}

		order!.status = status!;

		return await this.orderRepository.save(order!);
	}

	private async validateOrder(id: string): Promise<Order | null> {
		const found = await this.orderRepository.findById(id);
		if (!found) this.setError({ message: "Order not found" });
		return found;
	}

	private async validateStatus(status: OrderStatus | null) {
		if (status === null) this.setError({ message: "Invalid order status" });
	}
}