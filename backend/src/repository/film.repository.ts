import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './films.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  async getAllFilms(): Promise<Film[]> {
    return this.filmModel.find({}, { schedule: 0 }).exec(); //удалили расписание
  }

  async getFilmById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async update(id: string, updateData: Partial<Film>): Promise<Film | null> {
    return this.filmModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .exec();
  }
}
