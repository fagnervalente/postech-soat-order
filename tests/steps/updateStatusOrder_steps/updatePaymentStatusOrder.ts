import { Given, Then } from "@cucumber/cucumber";
import { Order, OrderPaymentStatus, OrderStatus } from "../../../src/domain/entities/Order";
import OrderInMemoryRepository from '../../utils/repositoryInMemory/OrderInMemoryRepository';
import assert from "assert";
import UpdatePaymentStatusUseCase from '../../../src/app/useCase/UpdatePaymentStatusUseCase';

const mockedOrder: Order = ({
  customerId: "12345678912",
  products: [1, 2, 3],
  status: OrderStatus.RECEBIDO,
  paymentStatus: OrderPaymentStatus.AGUARDANDO,
  id: "1",
});

const orderRepository = new OrderInMemoryRepository();
let updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(orderRepository);
let response: Order | null;

Given('inicio a atualização do status do pagamento de um pedido passando o id {string} como parametro', async function (string) {
  if (string === "1") {
    orderRepository.orders.push(mockedOrder);
  }
  updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(orderRepository);
  response = await updatePaymentStatusUseCase.execute(string, OrderPaymentStatus.APROVADO);
});

Then('o resultado não deve retornar erros ao atualizar o status do pagamento do pedido', function () {
  return assert.deepStrictEqual(updatePaymentStatusUseCase.hasErrors(), false);
});

Then('deve retornar o pedido com o pagamento atualizado', function () {
  return assert.equal(response?.paymentStatus, OrderPaymentStatus.APROVADO);
});

Then('o resultado deve retornar erros ao atualizar o status do pagamento do pedido', function () {
  return assert.deepStrictEqual(updatePaymentStatusUseCase.hasErrors(), true);
});

Then('não deve retornar o pedido com o pagamento atualizado', function () {
  return assert.equal(response, null);
});