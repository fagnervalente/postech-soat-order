import IOrderQueue from "@ports/IOrderQueue";
import channel from "./messaging";

export default class OrderQueue implements IOrderQueue {
    publish(message: Object): boolean {
        return channel.sendToQueue(process.env.ORDER_QUEUE_NAME as string, Buffer.from(JSON.stringify(message)));
    }
}