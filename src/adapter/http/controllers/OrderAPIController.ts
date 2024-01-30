import { Request, Response } from "express";
import OrderDatabaseRepository from "@database/repository/OrderDatabaseRepository";
import OrderController from "@controllers/OrderController";
import { OrderPaymentStatus, OrderStatus } from "@entities/Order";

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

	async list(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint para listar todos os pedidos.'

		OrderController.list(orderRepository)
			.then((result: any) => {
				/* #swagger.responses[200] = {
						schema: { $ref: "#/definitions/ListOrders" },
						description: 'Pedidos encontrados'
				} */
				return res.status(200).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

	async getByPaymentStatus(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint que retorna o status de pagamento de um pedido.'
		const orderId = req.params.id;

		OrderController.getByPaymentStatus(orderId, orderRepository)
			.then((result: any) => {
				/* #swagger.responses[200] = {
						schema: { $ref: "#/definitions/GetPaymentStatus" },
						description: 'Status do pedido'
				} */
				return res.status(200).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

	async updateStatus(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint para atualizar status de um pedido.'
		const orderId = req.params.id;
		const orderStatus = req.body.status as OrderStatus;

		OrderController.updateStatus(orderId, orderStatus, orderRepository)
			.then((result: any) => {
				/* #swagger.responses[200] = {
						description: 'Status do pedido'
				} */
				return res.status(200).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

	async updatePaymentStatus(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint para atualizar status do pagamento de um pedido.'
		const orderId = req.params.id;
		const paymentStatus = req.body.status as OrderPaymentStatus;

		OrderController.updatePaymentStatus(orderId, paymentStatus, orderRepository)
			.then((result: any) => {
				/* #swagger.responses[200] = {
						description: 'Status do pagamento'
				} */
				return res.status(200).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}
}