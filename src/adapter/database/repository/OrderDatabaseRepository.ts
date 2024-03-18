import { AppDataSource } from "../data-source";
import IOrderRepository from "@ports/IOrderRepository";
import { OrderModel, OrderStatus } from "@database/models/OrderModel";
import { Order } from "@entities/Order";

export default class OrderDatabaseRepository implements IOrderRepository {

  orderRepository = AppDataSource.getMongoRepository(OrderModel);

  async save(order: Order): Promise<Order> {
    const newOrder = this.orderRepository.create(order);
    return await this.orderRepository.save(newOrder);
  }

  list(): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        status: { $not: { $in: [OrderStatus.FINALIZADO.valueOf()] } },
      },
      order: { status: 'DESC', id: 'DESC' }
    });
  }

  async update(order: Order): Promise<void> {
    const orderId = Number(order.id);
    await this.orderRepository.update(orderId, order);
    return;
  }

  async findById(id: string): Promise<Order | null> {
    return await this.orderRepository.findOneBy(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

}