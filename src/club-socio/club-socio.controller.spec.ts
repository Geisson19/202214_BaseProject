import { Test, TestingModule } from '@nestjs/testing';
import { ClubSocioController } from './club-socio.controller';
import { ClubSocioService } from './club-socio.service';

describe('ClubSocioController', () => {
  let controller: ClubSocioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubSocioController],
      providers: [ClubSocioService],
    }).compile();

    controller = module.get<ClubSocioController>(ClubSocioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
