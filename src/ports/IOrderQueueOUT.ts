export default interface IOrderQueueOUT {
    publishToCreated(message: Object): boolean;
    publishOnReadyToPrepare(message: Object): boolean;
}