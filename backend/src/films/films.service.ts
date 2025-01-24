import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/entities/schedule.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmsRepository: Repository<Film>,
  ) {}

  async getAllFilms(): Promise<{ total: number; items: Film[] }> {
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

  async getFilmSchedule(
    id: string,
  ): Promise<{ total: number; items: Schedule[] }> {
    const films = await this.filmsRepository.findOne({
      where: { id: id },
      relations: { schedule: true },
    });
    if (!films) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    return { total: films.schedule.length, items: films.schedule };
  }
}
