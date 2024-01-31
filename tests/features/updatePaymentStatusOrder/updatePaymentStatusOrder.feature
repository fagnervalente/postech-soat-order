Feature: Atualiza status do pagamento de um pedido

  Scenario: Deve atualizar o status do pagamento de um pedido passando um ID existente
    Given inicio a atualização do status do pagamento de um pedido passando o id '1' como parametro
    Then o resultado não deve retornar erros ao atualizar o status do pagamento do pedido
    And deve retornar o pedido com o pagamento atualizado

  Scenario: Não deve atualizar o status do pagamento de um pedido passando um ID inexistente
    Given inicio a atualização do status do pagamento de um pedido passando o id '1524' como parametro
    Then o resultado deve retornar erros ao atualizar o status do pagamento do pedido
    And não deve retornar o pedido com o pagamento atualizado
