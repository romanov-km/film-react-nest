import {
  IsString,
  IsNumber,
  IsArray,
  IsNotEmpty,
  Max,
  Min,
  ArrayNotEmpty,
} from 'class-validator';

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
