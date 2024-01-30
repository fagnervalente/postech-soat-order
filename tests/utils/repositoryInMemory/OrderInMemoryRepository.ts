import OrderRepository from "../../../src/ports/IOrderRepository";
import { OrderModel as Order } from "../../../src/adapter/database/models/OrderModel";

export default class OrderInMemoryRepository implements OrderRepository {

	public orders: Order[] = [];

	public async save(order: Order): Promise<Order> {
		const created = {
			...order,
			id: order.id ? order.id : Math.floor(Math.random() * Date.now()).toString()
		};
		this.orders.push(created);

		return created;
	}

	public async list(): Promise<Order[]> {
		return [...this.orders];
	}

	public async update(order: Order): Promise<void> {
		this.orders.map((c) => {
			if (c.id == order.id) {
				c.customerId = order.customerId;
				c.paymentStatus = order.paymentStatus;
				c.products = order.products;
				c.status = order.status;
				c.totalPrice = order.totalPrice;
			}
		});
	}


	public async findById(id: string): Promise<Order | null> {
		const found = this.orders.find((order) => order.id == id) ?? null;
		return found;
	}
}