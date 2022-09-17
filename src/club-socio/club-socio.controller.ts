import { Controller } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';

@Controller('club-socio')
export class ClubSocioController {
  constructor(private readonly clubSocioService: ClubSocioService) {}
}
