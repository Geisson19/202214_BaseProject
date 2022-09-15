import { Test, TestingModule } from '@nestjs/testing';
import { SocioClubController } from './socio-club.controller';
import { SocioClubService } from './socio-club.service';

describe('SocioClubController', () => {
  let controller: SocioClubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocioClubController],
      providers: [SocioClubService],
    }).compile();

    controller = module.get<SocioClubController>(SocioClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
