import { PartialType } from '@nestjs/mapped-types';
import { CreateClubSocioDto } from './create-club-socio.dto';

export class UpdateClubSocioDto extends PartialType(CreateClubSocioDto) {}
