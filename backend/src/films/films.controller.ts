import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmDto } from './dto/films.dto';

@Controller('/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<{ total: number; items: GetFilmDto[] }> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmSchedule(id);
  }
}
