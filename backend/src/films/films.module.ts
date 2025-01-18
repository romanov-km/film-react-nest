import { Module } from '@nestjs/common';
import { Film } from 'src/entities/film.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
