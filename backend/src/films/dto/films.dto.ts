import {
  IsString,
  IsNumber,
  IsArray,
  IsNotEmpty,
  Max,
  Min,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetScheduleDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  daytime: string;

  @IsNumber()
  @Min(1)
  hall: number;

  @IsNumber()
  @Min(1)
  rows: number;

  @IsNumber()
  @Min(1)
  seats: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  taken: string[];
}

export class GetFilmDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsNumber()
  @Max(10)
  @Min(0)
  rating: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  cover: string;

  @IsArray()
  @ArrayNotEmpty()
  schedule: GetScheduleDto[];
}

// DTO для списка всех фильмов
export class GetAllFilmsDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetFilmDto)
  items: GetFilmDto[];
}

// DTO для расписания фильма
export class GetFilmScheduleDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetScheduleDto)
  items: GetScheduleDto[];
}
