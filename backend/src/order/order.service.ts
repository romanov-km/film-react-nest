import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  // Получение фильма по ID
  async getFilmById(id: string): Promise<Film> {
    return this.filmsRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  // Создание заказа
  async createOrder(orderData: CreateOrderDto): Promise<any> {
    const { tickets } = orderData;

    for (const ticket of tickets) {
      // Проверяем, что фильм существует
      const film = await this.getFilmById(ticket.film);
      if (!film) {
        throw new NotFoundException(`Фильм с ID ${ticket.film} не найден`);
      }

      // Ищем сеанс
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
      session.taken = [...session.taken, `${ticket.row}:${ticket.seat}`];
      await this.scheduleRepository.save(session);
    }

    // Возвращаем подтверждение заказа
    return {
      total: tickets.length,
      items: tickets,
    };
  }
}
