import { Given, Then } from "@cucumber/cucumber";
import { Order, OrderStatus } from "../../../src/domain/entities/Order";
import CreateUseCase from "../../../src/app/useCase/CreateUseCase";
import OrderInMemoryRepository from '../../utils/repositoryInMemory/OrderInMemoryRepository';
import assert from "assert";

const orderRepository = new OrderInMemoryRepository();
const createUseCase = new CreateUseCase(orderRepository);
let orderCreated: Order | null;

Given('chamo o método de criar pedido passando um pedido válido', async function () {
    const validOrder: Order = ({
        customerId: "12345678912",
        products: [1, 2, 3]
    });
    orderCreated = await createUseCase.execute(validOrder);
});

Then('o resultado deve ser de sucesso', function () {
    return assert.deepStrictEqual(createUseCase.hasErrors(), false);
});

Then('deve retornar o pedido com o id', function () {
    return assert.ok(orderCreated?.id);
});

Given('chamo o método de criar pedido passando um pedido inválido', async function () {
    const invalidOrder: Order = ({
        customerId: "12345678912",
        products: []
    });
    orderCreated = await createUseCase.execute(invalidOrder);
});

Then('o resultado deve ser de erro', function () {
    return assert.deepStrictEqual(createUseCase.hasErrors(), true);
});

Then('o resultado deve retornar null', function () {
    return assert.equal(orderCreated, null);
});