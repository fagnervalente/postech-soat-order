import { Request, Response } from "express";
import OrderDatabaseRepository from "@database/repository/OrderDatabaseRepository";
import OrderController from "@controllers/OrderController";

const orderRepository = new OrderDatabaseRepository();

export default class OrderAPIController {
	async checkout(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint para realizar o checkout.'
		/* #swagger.parameters['checkout'] = {
				in: 'body',
				description: 'Informações do pedido para checkout.',
				required: true,
				schema: { $ref: "#/definitions/Checkout" }
		} */
		const { products, cpf } = req.body;

		OrderController.checkout(products, cpf, orderRepository)
			.then((result: any) => {
				/* #swagger.responses[201] = {
						schema: { $ref: "#/definitions/OrderCreated" },
						description: 'Pedito criado'
				} */
				return res.status(201).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

	// async list(req: Request, res: Response) {
	// 	// #swagger.tags = ['Order']
	// 	// #swagger.description = 'Endpoint para listar todos os pedidos.'

	// 	OrderController.list(orderRepository)
	// 		.then((result: any) => {
	// 			/* #swagger.responses[200] = {
	// 					schema: { $ref: "#/definitions/ListOrders" },
	// 					description: 'Pedidos encontrados'
	// 			} */
	// 			return res.status(200).json(result);
	// 		})
	// 		.catch((errors: any) => {
	// 			return res.status(400).json(errors);
	// 		});
	// }

	// async handlePaymentWebhook(req: Request, res: Response) {
	// 	// #swagger.tags = ['Order']
	// 	// #swagger.description = 'Endpoint que recebe as notificações de atualização de status de pagamento.'
	// 	const orderId = Number(req.params.id);
	// 	const webhookNotification = req.body;

	// 	const paymentAPIIntegration = new MercadopagoIntegration();
	// 	const paymentStatusGateway = new PaymentStatusGatewayWebhookMercadopago(paymentAPIIntegration, webhookNotification);

	// 	OrderController.handlePaymentWebhook(orderId, paymentStatusGateway, orderRepository)
	// 		.then(() => {
	// 			/* #swagger.responses[200] = {
	// 					schema: { $ref: "#/definitions/HandlePaymentWebhook" },
	// 					description: 'Status do pagamento do pedido atualizado'
	// 			} */
	// 			return res.status(200).json();
	// 		})
	// 		.catch((errors: any) => {
	// 			return res.status(400).json(errors);
	// 		});
	// }

	// async getPaymentStatus(req: Request, res: Response) {
	// 	// #swagger.tags = ['Order']
	// 	// #swagger.description = 'Endpoint que retorna o status de pagamento de um pedido.'
	// 	const orderId = Number(req.params.id);

	// 	OrderController.getPaymentStatus(orderId, orderRepository)
	// 		.then((result: any) => {
	// 			/* #swagger.responses[200] = {
	// 					schema: { $ref: "#/definitions/GetPaymentStatus" },
	// 					description: 'Status do pedido'
	// 			} */
	// 			return res.status(200).json(result);
	// 		})
	// 		.catch((errors: any) => {
	// 			return res.status(400).json(errors);
	// 		});
	// }

	// async updateStatus(req: Request, res: Response) {
	// 	// #swagger.tags = ['Order']
	// 	// #swagger.description = 'Endpoint para atualizar status de um pedido.'
	// 	const orderId = Number(req.params.id);
	// 	const orderStatus = req.body.status as OrderStatus;

	// 	OrderController.updateStatus(orderId, orderStatus, orderRepository)
	// 		.then((result: any) => {
	// 			/* #swagger.responses[200] = {
	// 					description: 'Status do pedido'
	// 			} */
	// 			return res.status(200).json(result);
	// 		})
	// 		.catch((errors: any) => {
	// 			return res.status(400).json(errors);
	// 		});
	// }
}