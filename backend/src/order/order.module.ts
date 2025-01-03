import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
//import { OrderRepository } from '../repository/order.repository';
import { Order, OrderSchema } from '../repository/order.schema';
import { FilmsModule } from 'src/films/films.module';
import { configProvider } from 'src/app.config.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    FilmsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, configProvider],
})
export class OrderModule {}
