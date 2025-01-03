import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  logger: any;
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: CreateOrderDto): Promise<any> {
    const makeOrder = await this.orderService.createOrder(orderData);
    return makeOrder;
  }
}
