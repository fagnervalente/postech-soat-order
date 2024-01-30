import { Column, Entity, ObjectIdColumn } from 'typeorm';

export enum OrderStatus {
  RECEBIDO = "Recebido",
  EM_PREPARACAO = "Em preparação",
  PRONTO = "Pronto",
  FINALIZADO = "Finalizado"
}

export enum OrderPaymentStatus {
  APROVADO = "Aprovado",
  RECUSADO = "Recusado",
  AGUARDANDO = "Aguardando pagamento"
}

@Entity('orders')
export class OrderModel {
  @ObjectIdColumn()
  id?: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.RECEBIDO
  })
  status?: OrderStatus;

  @Column({
    type: "enum",
    enum: OrderPaymentStatus,
    default: OrderPaymentStatus.AGUARDANDO
  })
  paymentStatus?: OrderPaymentStatus;

  @Column("int", { array: true })
  products: number[];

  @Column({ type: 'text' })
  customerId?: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  totalPrice?: number;

  constructor(
    id: string | undefined,
    status: OrderStatus | undefined,
    paymentStatus: OrderPaymentStatus | undefined,
    products: number[],
    customerId: string | undefined,
    totalPrice: number | undefined
  ) {
    this.id = id;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.products = products;
    this.customerId = customerId;
    this.totalPrice = totalPrice;
  }
}