import { Router } from "express";
import HttpUtils from "../HttpUtils";
import OrderAPIController from "../controllers/OrderAPIController";

const orderRoutes = HttpUtils.asyncRouterHandler(Router());

orderRoutes.get('/order', new OrderAPIController().list);
orderRoutes.post('/order/checkout', new OrderAPIController().checkout);
orderRoutes.get('/order/payment/:id', new OrderAPIController().getByPaymentStatus);
orderRoutes.put('/order/status/:id', new OrderAPIController().updateStatus);
orderRoutes.put('/order/paymentStatus/:id', new OrderAPIController().updatePaymentStatus);

export default orderRoutes;