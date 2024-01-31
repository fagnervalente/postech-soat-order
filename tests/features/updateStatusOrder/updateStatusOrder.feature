Feature: Atualiza status de um pedido

  Scenario: Deve atualizar o pedido passando um ID existente
    Given inicio a atualização do pedido passando o id '1' como parametro
    Then o resultado não deve retornar erros ao atualizar o status do pedido
    And deve retornar o pedido atualizado

  Scenario: Não deve atualizar o pedido passando um ID inexistente
    Given inicio a atualização do pedido passando o id '1524' como parametro
    Then o resultado deve retornar erros ao atualizar o status do pedido
    And não deve retornar o pedido atualizado
