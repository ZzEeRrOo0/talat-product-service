import { Order } from "../../../entities/order";

export interface CreateNewOrderUseCase {
	execute(order: Order): Promise<number>;
}
