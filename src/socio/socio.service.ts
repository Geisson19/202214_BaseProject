import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';

import { Socio } from './entities/socio.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,
  ) {}

  /**
   * It returns true if the email address of the given socio contains an @ symbol
   * @param {Socio} socio - Socio - The object that we're validating.
   * @returns A boolean value.
   */
  isValidEmail(socio: Socio) {
    return socio.correo.includes('@');
  }

  /**
   * If the email is valid, save the socio
   * @param {Socio} socio - Socio - this is the object that we're going to save to the database.
   * @returns The saved socio.
   */
  async create(socio: Socio) {
    if (!this.isValidEmail(socio)) {
      return;
    }
    return await this.socioRepository.save(socio);
  }

  /**
   * It returns a list of all the socios in the database, including the club they belong to
   * @returns An array of Socio objects.
   */
  async findAll() {
    return await this.socioRepository.find({ relations: ['club'] });
  }

  /**
   * It finds a socio by its id and returns it
   * @param {string} id - string - The id of the socio we want to find
   * @returns A socio object
   */
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

  /**
   * It updates a socio in the database
   * @param {string} id - The id of the socio to update
   * @param {Socio} socio - Socio - The socio object that we want to update.
   * @returns The updated socio
   */
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

  /**
   * It deletes a socio from the database
   * @param {string} id - string - The id of the socio to be deleted
   */
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
