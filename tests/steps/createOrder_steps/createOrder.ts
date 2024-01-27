import { Given, Then } from "@cucumber/cucumber";
import { Order, OrderStatus } from "../../../src/domain/entities/Order";
import CreateUseCase from "../../../src/app/useCase/CreateUseCase";
import OrderInMemoryRepository from '../../utils/repositoryInMemory/OrderInMemoryRepository';
import assert from "assert";

const orderRepository = new OrderInMemoryRepository();
const createUseCase = new CreateUseCase(orderRepository);
let validOrderCreated: Order | null;
let invalidOrderCreated: Order | null;

Given('inicio a criação do pedido passando dados válidos', async function (int) {
    const validOrder: Order = ({
        customerId: "12345678912",
        products: [1, 2, 3]
    });
    validOrderCreated = await createUseCase.execute(validOrder);
});

Then('o pedido foi criado com sucesso', function () {
    return assert.deepStrictEqual(createUseCase.hasErrors(), false);
});

Then('o id foi gerado', function () {
    return assert.ok(validOrderCreated?.id);
});

Then('os produtos foram salvos', function () {
    return assert.equal(validOrderCreated?.products.length, 3);
});

Given('inicio a criação do pedido sem produtos', async function () {
    const invalidOrder: Order = ({
        customerId: "12345678912",
        products: []
    });
    invalidOrderCreated = await createUseCase.execute(invalidOrder);
});

Then('deve prencher o erro', function () {
    return assert.ok(createUseCase.hasErrors());
});

Then('o produto criado deve ser null', function () {
    return assert.equal(invalidOrderCreated, null);
});