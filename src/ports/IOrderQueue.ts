export default interface IOrderQueue {
    publish(message: Object): boolean;
}