import { Order } from "@entities/Order";
import IOrderRepository from "@ports/IOrderRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class ListUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderRepository) {
		super(orderRepository);
	}

	async execute(): Promise<Order[] | null> {
		return await this.orderRepository.list();
	}
}