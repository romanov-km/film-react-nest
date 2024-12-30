import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Film } from 'src/repository/films.schema';
import { FilmsController } from './films.controller';
import { FilmsRepository } from 'src/repository/film.repository';
import { FilmsService } from './films.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Film.name, schema: Film }])],
  controllers: [FilmsController],
  providers: [FilmsRepository, FilmsService],
  exports: [FilmsRepository],
})
export class FilmsModule {}
