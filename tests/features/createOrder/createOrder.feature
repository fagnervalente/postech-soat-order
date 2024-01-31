Feature: Deve criar uma order se tudo certo

  Scenario: Deve criar uma order passando dados válidos
    Given chamo o método de criar pedido passando um pedido válido
    Then o resultado deve ser de sucesso
    And deve retornar o pedido com o id

  Scenario: Deve retornar erro ao passar um pedido inválido
    Given chamo o método de criar pedido passando um pedido inválido
    Then o resultado deve ser de erro
    And o resultado deve retornar null
