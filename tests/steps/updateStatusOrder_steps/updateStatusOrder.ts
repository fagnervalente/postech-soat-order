import { Given, Then } from "@cucumber/cucumber";
import { Order, OrderStatus } from "../../../src/domain/entities/Order";
import OrderInMemoryRepository from '../../utils/repositoryInMemory/OrderInMemoryRepository';
import assert from "assert";
import UpdateStatusUseCase from '../../../src/app/useCase/UpdateStatusUseCase';

const mockedOrder: Order = ({
  customerId: "12345678912",
  products: [1, 2, 3],
  status: OrderStatus.RECEBIDO,
  id: "1",
});

const orderRepository = new OrderInMemoryRepository();
let updateStatusUseCase = new UpdateStatusUseCase(orderRepository);
let response: Order | null;

Given('inicio a atualização do pedido passando o id {string} como parametro', async function (string) {
  if (string === "1") {
    orderRepository.orders.push(mockedOrder);
  }
  updateStatusUseCase = new UpdateStatusUseCase(orderRepository);
  response = await updateStatusUseCase.execute(string, OrderStatus.EM_PREPARACAO);
});

Then('o resultado não deve retornar erros ao atualizar o status do pedido', function () {
  return assert.deepStrictEqual(updateStatusUseCase.hasErrors(), false);
});

Then('deve retornar o pedido atualizado', function () {
  return assert.equal(response?.status, OrderStatus.EM_PREPARACAO);
});

Then('o resultado deve retornar erros ao atualizar o status do pedido', function () {
  return assert.deepStrictEqual(updateStatusUseCase.hasErrors(), true);
});

Then('não deve retornar o pedido atualizado', function () {
  return assert.equal(response, null);
});