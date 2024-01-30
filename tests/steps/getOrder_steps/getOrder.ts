import { Given, Then } from "@cucumber/cucumber";
import { Order, OrderStatus } from "../../../src/domain/entities/Order";
import CreateUseCase from "../../../src/app/useCase/CreateUseCase";
import GetByIdUseCase from "../../../src/app/useCase/GetByIdUseCase";
import OrderInMemoryRepository from '../../utils/repositoryInMemory/OrderInMemoryRepository';
import assert from "assert";

const mockedOrder: Order = ({
  customerId: "12345678912",
  products: [1, 2, 3],
});

const orderRepository = new OrderInMemoryRepository();
const createUseCase = new CreateUseCase(orderRepository);
let getByIdUseCase = new GetByIdUseCase(orderRepository);

Given('inicio a obtenção do pedido existente passando o id como parametro', async function () {
  let createdOrder: Order | null;
  createdOrder = await saveMockOrder(mockedOrder);
  getByIdUseCase = new GetByIdUseCase(orderRepository);
  this.result = [await getByIdUseCase.execute(createdOrder?.id || "0")];
});

Then('o resultado deve ser de sucesso', function () {
  return assert.deepStrictEqual(getByIdUseCase.hasErrors(), false);
});

Then('deve retornar {int} item', function (int) {
  return assert.equal(this.result.length, int);
});

Given('inicio a obtenção do pedido passando o id inesistente como parâmetro', async function () {
  getByIdUseCase = new GetByIdUseCase(orderRepository);
  this.result = [await getByIdUseCase.execute("0")];
});

Then('o resultado deve retornar erro', function () {
  return assert.deepStrictEqual(getByIdUseCase.hasErrors(), true);
});

Then('deve retornar a mensagem de erro {string}', function (string) {
  return assert.deepStrictEqual(getByIdUseCase.getErrors()[0].message, string);
});

async function saveMockOrder(mock: Order | any): Promise<Order | null> {
  const created = await createUseCase.execute(mock);
  return created;
}