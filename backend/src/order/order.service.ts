import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/film.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async createOrder(orderData: CreateOrderDto): Promise<any> {
    const { tickets } = orderData;

    for (const ticket of tickets) {
      // Проверяем, что фильм и сеанс существуют
      const film = await this.filmRepository.getFilmById(ticket.film);
      if (!film) {
        throw new NotFoundException(`Фильм с ID ${ticket.film} не найден`);
      }

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new NotFoundException(`Сеанс с ID ${ticket.session} не найден`);
      }

      // Проверяем, что место не занято
      const isTaken = session.taken.includes(`${ticket.row}:${ticket.seat}`);
      if (isTaken) {
        throw new ConflictException(
          `Место ${ticket.row}:${ticket.seat} уже занято`,
        );
      }

      // Обновляем занятость места
      session.taken.push(`${ticket.row}:${ticket.seat}`);
      await this.filmRepository.update(film.id, { schedule: film.schedule });
    }

    // Возвращаем подтверждение заказа
    return {
      // email,
      // phone,
      total: tickets.length,
      items: tickets,
    };
  }
}
