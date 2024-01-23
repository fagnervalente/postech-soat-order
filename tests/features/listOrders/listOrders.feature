Feature: Deve listar os pedidos

  Scenario: Deve listar todos os pedidos
    Given inicio a listagem de queue sem passar o id
    Then deve retornar 0 itens
