import { Router } from "express";
import HttpUtils from "../HttpUtils";
import OrderAPIController from "../controllers/OrderAPIController";

const orderRoutes = HttpUtils.asyncRouterHandler(Router());

// orderRoutes.get('/order', new OrderAPIController().list);
orderRoutes.post('/order/checkout', new OrderAPIController().checkout);
// orderRoutes.get('/order/payment/:id', new OrderAPIController().getPaymentStatus);

// orderRoutes.post('/order/payment/:id', new OrderAPIController().handlePaymentWebhook);
// orderRoutes.put('/order/status/:id', new OrderAPIController().updateStatus);

export default orderRoutes;