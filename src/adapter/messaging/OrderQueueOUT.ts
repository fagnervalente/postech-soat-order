import IOrderQueueOUT from "@ports/IOrderQueueOUT";
import Messaging from "./messaging";

export default class OrderQueueOUT implements IOrderQueueOUT {
    publish(message: Object): boolean {
        return Messaging.getChannel().sendToQueue(process.env.ORDER_QUEUE_NAME as string, Buffer.from(JSON.stringify(message)));
    }
}