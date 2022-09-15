import { Test, TestingModule } from '@nestjs/testing';
import { SocioService } from './socio.service';

describe('SocioService', () => {
  let service: SocioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocioService],
    }).compile();

    service = module.get<SocioService>(SocioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
