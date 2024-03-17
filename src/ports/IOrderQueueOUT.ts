export default interface IOrderQueueOUT {
    publish(message: Object): boolean;
}