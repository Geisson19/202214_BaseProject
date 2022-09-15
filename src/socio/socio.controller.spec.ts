import { Test, TestingModule } from '@nestjs/testing';
import { SocioController } from './socio.controller';
import { SocioService } from './socio.service';

describe('SocioController', () => {
  let controller: SocioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocioController],
      providers: [SocioService],
    }).compile();

    controller = module.get<SocioController>(SocioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
