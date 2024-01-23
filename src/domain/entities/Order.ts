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

export class Order {
  id?: number;
  status?: OrderStatus;
  paymentStatus?: OrderPaymentStatus;
  products: number[];
  customerId?: string;
  totalPrice?: number;
}