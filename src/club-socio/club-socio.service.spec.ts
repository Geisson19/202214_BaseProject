import { Test, TestingModule } from '@nestjs/testing';
import { ClubSocioService } from './club-socio.service';

describe('ClubSocioService', () => {
  let service: ClubSocioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubSocioService],
    }).compile();

    service = module.get<ClubSocioService>(ClubSocioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
