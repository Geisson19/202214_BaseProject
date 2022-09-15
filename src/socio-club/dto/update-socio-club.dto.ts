import { PartialType } from '@nestjs/mapped-types';
import { CreateSocioClubDto } from './create-socio-club.dto';

export class UpdateSocioClubDto extends PartialType(CreateSocioClubDto) {}
