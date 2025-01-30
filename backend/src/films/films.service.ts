import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { GetAllFilmsDto, GetFilmScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);
  constructor(
    @InjectRepository(Film) private filmsRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async getAllFilms(): Promise<GetAllFilmsDto> {
    const films = await this.filmsRepository.find();
    return {
      total: films.length,
      items: films.map((film) => ({
        id: film.id,
        title: film.title,
        description: film.description,
        schedule: film.schedule,
        director: film.director,
        tags: film.tags,
        rating: film.rating,
        cover: film.cover,
        image: film.image,
        about: film.about,
      })),
    };
  }

  async getFilmSchedule(id: string): Promise<GetFilmScheduleDto> {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    if (!film) {
      this.logger.warn(`Фильм с ID ${id} не найден`);
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    return { total: film.schedule?.length || 0, items: film.schedule || [] };
  }
}
