import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetAllFilmsDto, GetFilmScheduleDto } from './dto/films.dto';

@Controller('/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<GetAllFilmsDto> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string): Promise<GetFilmScheduleDto> {
    return this.filmsService.getFilmSchedule(id);
  }
}
