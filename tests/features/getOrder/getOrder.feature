Feature: Deve retornar os pedidos encontrados

  Scenario: Deve retornar o pedido passando um ID existente
    Given inicio a obtenção do pedido passando o id '1' como parametro
    Then o resultado não deve retornar erros
    And deve retornar 1 item

  Scenario: Não deve retornar o pedido passando um ID inexistente
    Given inicio a obtenção do pedido passando o id '1524' como parametro
    Then o resultado deve retornar erro
    And deve retornar a mensagem de erro 'Order not found'
