import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'uniqueTickets', async: false })
export class UniqueTicketsConstraint implements ValidatorConstraintInterface {
  validate(tickets: GetTicketDto[], args: ValidationArguments) {
    const seatSet = new Set(
      tickets.map((ticket) => `${ticket.row}:${ticket.seat}`),
    );
    return seatSet.size === tickets.length;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Каждое место в tickets должно быть уникальным.';
  }
}

//TODO реализовать DTO для /orders

export class GetTicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^\+?\d{10,15}$/, { message: 'Неверный формат номера телефона' })
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetTicketDto)
  @Validate(UniqueTicketsConstraint)
  tickets!: GetTicketDto[];

  @IsString()
  @IsOptional()
  id?: string;
}
