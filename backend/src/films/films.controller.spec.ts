import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest.fn(),
        getFilmSchedule: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('.getAllFilms() should call getAllFilms method of the service', () => {
    controller.getAllFilms();
    expect(service.getAllFilms).toHaveBeenCalled();
  });

  it('.getFilmSchedule() should call getFilmSchedule method of the service', () => {
    controller.getFilmSchedule('1');
    expect(service.getFilmSchedule).toHaveBeenCalled();
  });
});
