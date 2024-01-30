import { Order } from "@entities/Order";

export default interface IOrderRepository {
  save(order: Order): Promise<Order | null>;
  list(): Promise<Order[]>;
  update(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>
}