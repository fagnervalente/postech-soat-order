import { Given, Then } from "@cucumber/cucumber";
import { Order } from "../../../src/domain/entities/Order";
import GetByIdUseCase from "../../../src/app/useCase/GetByIdUseCase";
import OrderInMemoryRepository from '../../utils/repositoryInMemory/OrderInMemoryRepository';
import assert from "assert";

const mockedOrder: Order = ({
  customerId: "12345678912",
  products: [1, 2, 3],
  id: "1",
});

const orderRepository = new OrderInMemoryRepository();
let getByIdUseCase = new GetByIdUseCase(orderRepository);

Given('inicio a obtenção do pedido passando o id {string} como parametro', async function (string) {
  if (string === "1") {
    orderRepository.orders.push(mockedOrder);
  }
  getByIdUseCase = new GetByIdUseCase(orderRepository);
  this.result = [await getByIdUseCase.execute(string)];
});

Then('o resultado não deve retornar erros', function () {
  return assert.deepStrictEqual(getByIdUseCase.hasErrors(), false);
});

Then('deve retornar {int} item', function (int) {
  return assert.equal(this.result.length, int);
});

Then('o resultado deve retornar erro', function () {
  return assert.deepStrictEqual(getByIdUseCase.hasErrors(), true);
});

Then('deve retornar a mensagem de erro {string}', function (string) {
  return assert.deepStrictEqual(getByIdUseCase.getErrors()[0].message, string);
});