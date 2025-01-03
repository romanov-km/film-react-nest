import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  film: string;

  @Prop({ required: true })
  session: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  row: number;

  @Prop({ required: true })
  seat: number;

  @Prop({ required: true })
  price: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

@Schema()
export class Order {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [TicketSchema], required: true })
  tickets: Ticket[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
