import { Given, Then } from "@cucumber/cucumber";
import { Order, OrderStatus } from "../../../src/domain/entities/Order";
import CreateUseCase from "../../../src/app/useCase/CreateUseCase";
import GetByIdUseCase from "../../../src/app/useCase/GetByIdUseCase";
import OrderInMemoryRepository from '../../utils/repositoryInMemory/OrderInMemoryRepository';
import assert from "assert";

const mockedOrder: Order = ({
  customerId: "12345678912",
  products: [1, 2, 3],
  status: OrderStatus.RECEBIDO,
  id: 1,
});

const orderRepository = new OrderInMemoryRepository();
const createUseCase = new CreateUseCase(orderRepository);
let getByIdUseCase = new GetByIdUseCase(orderRepository);

Given('inicio a obtenção do pedido passando o id {int} como parametro', async function (int) {
  if (int == 1) {
    await saveMockOrder(mockedOrder);
  }
  getByIdUseCase = new GetByIdUseCase(orderRepository);
  this.result = [await getByIdUseCase.execute(int)];
});

Then('o resultado deve ser de sucesso', function () {
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

async function saveMockOrder(mock: Order | any): Promise<Order | null> {
  const created = await createUseCase.execute(mock);
  return created;
}