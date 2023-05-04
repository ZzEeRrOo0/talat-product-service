import { Order } from "../../../entities/order";

export interface GetOrderUseCase {
	execute(orderId: number): Promise<Order | null>;
}
