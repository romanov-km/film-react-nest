import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from 'src/entities/film.entity';

@Controller('/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<{ total: number; items: Film[] }> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmSchedule(id);
  }
}
