import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';

import { Socio } from './entities/socio.entity';
import { BusinessLogicException } from 'shared/errors/business-errors';
import { BusinessError } from '../../shared/errors/business-errors';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,
  ) {}

  isValidEmail(socio: Socio) {
    return socio.correo.includes('@');
  }

  async create(socio: Socio) {
    if (!this.isValidEmail(socio)) {
      return;
    }
    return await this.socioRepository.save(socio);
  }

  async findAll() {
    return await this.socioRepository.find({ relations: ['club'] });
  }

  async findOne(id: string) {
    const socio: Socio = await this.socioRepository.findOne({
      where: { id },
      relations: ['club'],
    });
    if (!socio)
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return socio;
  }

  async update(id: string, socio: Socio) {
    const persistedSocio: Socio = await this.socioRepository.findOne({
      where: { id },
    });

    if (!persistedSocio)
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    if (!this.isValidEmail(socio)) {
      return;
    }

    return await this.socioRepository.save({
      ...persistedSocio,
      ...socio,
    });
  }

  async delete(id: string) {
    const socio: Socio = await this.socioRepository.findOne({
      where: { id },
    });
    if (!socio)
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.socioRepository.remove(socio);
  }
}
