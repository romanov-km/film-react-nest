import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/film.repository';
import { GetFilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async getAllFilms(): Promise<{ total: number; items: GetFilmDto[] }> {
    const films = await this.filmRepository.getAllFilms();
    return {
      total: films.length,
      items: films.map((film) => ({
        id: film.id,
        title: film.title,
        director: film.director,
        rating: film.rating,
        tags: film.tags,
        about: film.about,
        description: film.description,
        image: film.image,
        cover: film.cover,
        schedule: film.schedule,
      })),
    };
  }

  async getFilmSchedule(id: string) {
    const film = await this.filmRepository.getFilmById(id);
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    return { total: film.schedule.length, items: film.schedule };
  }
}
