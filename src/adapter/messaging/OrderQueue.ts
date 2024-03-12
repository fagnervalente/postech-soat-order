import IOrderQueue from "@ports/IOrderQueue";
import Channel from "./messaging";

export default class OrderQueue implements IOrderQueue {
    publish(message: Object): boolean {
        return Channel.sendToQueue('notification_queue', Buffer.from(JSON.stringify(message)));
    }
}