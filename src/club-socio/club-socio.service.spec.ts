import { Test, TestingModule } from '@nestjs/testing';
import { ClubSocioService } from './club-socio.service';
import { Repository } from 'typeorm';
import { Club } from '../club/entities/club.entity';
import { Socio } from '../socio/entities/socio.entity';
import { TypeOrmTestingConfig } from '../../shared/utils/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('ClubSocioService', () => {
  let service: ClubSocioService;
  let clubRepo: Repository<Club>;
  let socioRepo: Repository<Socio>;
  let club: Club;
  let sociosList: Socio[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubSocioService],
    }).compile();

    service = module.get<ClubSocioService>(ClubSocioService);
    clubRepo = module.get<Repository<Club>>(getRepositoryToken(Club));
    socioRepo = module.get<Repository<Socio>>(getRepositoryToken(Socio));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    socioRepo.clear();
    clubRepo.clear();

    sociosList = [];
    for (let i = 0; i < 5; i++) {
      const socio: Socio = await socioRepo.save({
        nombre: faker.name.firstName(),
        correo: faker.internet.email(),
        fechaNacimiento: faker.date.past(),
      });
      sociosList.push(socio);
    }

    club = await clubRepo.save({
      nombre: faker.name.firstName(),
      fechaFundacion: faker.date.past(),
      imageUrl: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
      socios: sociosList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addSocioToClub should add an socio to a club', async () => {
    const newSocio: Socio = await socioRepo.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      fechaNacimiento: faker.date.past(),
    });

    const newClub: Club = await clubRepo.save({
      nombre: faker.name.firstName(),
      fechaFundacion: faker.date.past(),
      imageUrl: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
    });

    const result: Club = await service.addSocioToClub(newClub.id, newSocio.id);

    expect(result.socios.length).toBe(1);
    expect(result.socios[0]).not.toBeNull();
    expect(result.socios[0].nombre).toBe(newSocio.nombre);
    expect(result.socios[0].correo).toBe(newSocio.correo);
    // expect(result.socios[0].fechaNacimiento).toBe(newSocio.fechaNacimiento);
  });

  it('addSocioToClub should thrown exception for an invalid socio', async () => {
    const newClub: Club = await clubRepo.save({
      nombre: faker.name.firstName(),
      fechaFundacion: faker.date.past(),
      imageUrl: faker.image.imageUrl(),
      descripcion: faker.lorem.paragraph(),
    });

    await expect(() =>
      service.addSocioToClub(newClub.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The socio with the given id was not found',
    );
  });

  it('addSocioToClub should throw an exception for an invalid club', async () => {
    const newSocio: Socio = await socioRepo.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      fechaNacimiento: faker.date.past(),
    });

    await expect(() =>
      service.addSocioToClub('0', newSocio.id),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('findSocioFromClub should return socio by club', async () => {
    const socio: Socio = sociosList[0];
    const storedArtwork: Socio = await service.findSocioFromClub(
      club.id,
      socio.id,
    );
    expect(storedArtwork).not.toBeNull();
    expect(storedArtwork.nombre).toBe(socio.nombre);
    expect(storedArtwork.correo).toBe(socio.correo);
    // expect(storedArtwork.fechaNacimiento).toBe(socio.fechaNacimiento);
  });

  it('findSocioFromClub should throw an exception for an invalid socio', async () => {
    await expect(() =>
      service.findSocioFromClub(club.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The socio with the given id was not found',
    );
  });

  it('findSocioFromClubs should throw an exception for an invalid club', async () => {
    const socio: Socio = sociosList[0];
    await expect(() =>
      service.findSocioFromClub('0', socio.id),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('findSocioFromClub should throw an exception for an socio not associated to the club', async () => {
    const newSocio: Socio = await socioRepo.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      fechaNacimiento: faker.date.past(),
    });

    await expect(() =>
      service.findSocioFromClub(club.id, newSocio.id),
    ).rejects.toHaveProperty(
      'message',
      'The socio with the given id is not associated to the club',
    );
  });

  it('findSociosFromClub should return socios by club', async () => {
    const socios: Socio[] = await service.findSociosFromClub(club.id);
    expect(socios.length).toBe(5);
  });

  it('findSociosFromClub should throw an exception for an invalid club', async () => {
    await expect(() => service.findSociosFromClub('0')).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('updateSociosFromClub should update socios list for a club', async () => {
    const newSocio: Socio = await socioRepo.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      fechaNacimiento: faker.date.past(),
    });

    const updatedMuseum: Club = await service.updateSociosFromClub(club.id, [
      newSocio,
    ]);
    expect(updatedMuseum.socios.length).toBe(1);

    expect(updatedMuseum.socios[0].nombre).toBe(newSocio.nombre);
    expect(updatedMuseum.socios[0].correo).toBe(newSocio.correo);
    // expect(updatedMuseum.socios[0].fechaNacimiento).toBe(
    //   newSocio.fechaNacimiento,
    // );
  });

  it('updateSociosFromClub should throw an exception for an invalid club', async () => {
    const newSocio: Socio = await socioRepo.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      fechaNacimiento: faker.date.past(),
    });

    await expect(() =>
      service.updateSociosFromClub('0', [newSocio]),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('updateSociosFromClub should throw an exception for an invalid socio', async () => {
    const newSocio: Socio = sociosList[0];
    newSocio.id = '0';

    await expect(() =>
      service.updateSociosFromClub(club.id, [newSocio]),
    ).rejects.toHaveProperty(
      'message',
      'The socio with the given id was not found',
    );
  });

  it('deleteSocioFromClub should remove an socio from a club', async () => {
    const socio: Socio = sociosList[0];

    await service.deleteSocioFromClub(club.id, socio.id);

    const storedMuseum: Club = await clubRepo.findOne({
      where: { id: club.id },
      relations: ['socios'],
    });
    const deletedArtwork: Socio = storedMuseum.socios.find(
      (a) => a.id === socio.id,
    );

    expect(deletedArtwork).toBeUndefined();
  });

  it('deleteSocioFromClub should thrown an exception for an invalid socio', async () => {
    await expect(() =>
      service.deleteSocioFromClub(club.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The socio with the given id was not found',
    );
  });

  it('deleteSocioFromClub should thrown an exception for an invalid club', async () => {
    const socio: Socio = sociosList[0];
    await expect(() =>
      service.deleteSocioFromClub('0', socio.id),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('deleteSocioFromClub should thrown an exception for an non asocciated socio', async () => {
    const newSocio: Socio = await socioRepo.save({
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      fechaNacimiento: faker.date.past(),
    });

    await expect(() =>
      service.deleteSocioFromClub(club.id, newSocio.id),
    ).rejects.toHaveProperty(
      'message',
      'The socio with the given id is not associated to the club',
    );
  });
});
