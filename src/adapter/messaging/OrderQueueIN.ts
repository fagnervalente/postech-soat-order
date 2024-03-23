import amqp from 'amqplib';
import IPaymentQueueIN from "@ports/IOrderQueueIN";
import OrderController from "@controllers/OrderController";
import OrderRepository from "@database/repository/OrderDatabaseRepository";

const orderRepository = new OrderRepository();

export default class PaymentQueueIN implements IPaymentQueueIN {
    async listen(channel: amqp.Channel): Promise<void> {
        channel.consume(process.env.PAYMENT_QUEUE_NAME as string, receivePaymentStatus, { noAck: true });
    }
}

async function receivePaymentStatus(msg: amqp.ConsumeMessage | null) {
    if (msg !== null) {
        try {
            const { orderId, status } = JSON.parse(msg.content.toString());
            await OrderController.updatePaymentStatus(orderId, status, orderRepository);
        } catch (e) {
            console.error(e);
        }
    } else {
        console.error('Consumer cancelled by server');
    }
}