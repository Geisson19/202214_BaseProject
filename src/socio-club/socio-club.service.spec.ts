import { Test, TestingModule } from '@nestjs/testing';
import { SocioClubService } from './socio-club.service';

describe('SocioClubService', () => {
  let service: SocioClubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocioClubService],
    }).compile();

    service = module.get<SocioClubService>(SocioClubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
