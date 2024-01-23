import { Given, Then } from '@cucumber/cucumber';
import assert from 'assert';

import ListUseCase from '../../../src/app/useCase/ListUseCase';
import OrderInMemoryRepository from '../../utils/repositoryInMemory/OrderInMemoryRepository';

const orderRepository = new OrderInMemoryRepository();

Given('inicio a listagem de queue sem passar o id', async function () {
  this.result = await new ListUseCase(orderRepository).execute();
});

Then('deve retornar {int} itens', function (int) {
  return assert.equal(this.result.length, int);
});