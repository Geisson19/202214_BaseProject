import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';

import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClubSocioService } from './club-socio.service';
import { Socio } from '../socio/entities/socio.entity';
import { plainToInstance } from 'class-transformer';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubSocioController {
  constructor(private readonly clubSocioService: ClubSocioService) {}

  @Post(':clubId/members/:memberId')
  async addMemberToClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubSocioService.addSocioToClub(clubId, memberId);
  }

  @Get(':clubId/members')
  async findMembersFromClub(@Param('clubId') clubId: string) {
    return await this.clubSocioService.findSociosFromClub(clubId);
  }

  @Get(':clubId/members/:memberId')
  async findMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubSocioService.findSocioFromClub(clubId, memberId);
  }

  @Put(':clubId/members')
  async updateMembersFromClub(
    @Body() sociosDTO: Socio[],
    @Param('clubId') clubId: string,
  ) {
    const socios: Socio[] = plainToInstance(Socio, sociosDTO);
    return await this.clubSocioService.updateSociosFromClub(clubId, socios);
  }

  @Delete(':clubId/members/:memberId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubSocioService.deleteSocioFromClub(clubId, memberId);
  }
}
