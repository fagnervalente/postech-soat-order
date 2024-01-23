Feature: Deve listar os pedidos

  Scenario: Deve listar todos os pedidos
    Given inicio a listagem de pedidos sem nenhum pedidos
    Then deve retornar 0 itens
