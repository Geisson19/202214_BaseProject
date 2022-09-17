import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../../shared/utils/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { Club } from './entities/club.entity';

describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<Club>;
  let clubsList: Club[];

  const seedDatabase = async () => {
    repository.clear();
    clubsList = [];
    for (let i = 0; i < 5; i++) {
      const club: Club = await repository.save({
        nombre: faker.name.firstName(),
        fechaFundacion: faker.date.past(),
        imageUrl: faker.image.imageUrl(),
        descripcion: faker.lorem.paragraph(),
      });
      clubsList.push(club);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<Club>>(getRepositoryToken(Club));

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all clubs', async () => {
    const clubs: Club[] = await service.findAll();
    expect(clubs).not.toBeNull();
    expect(clubs).toHaveLength(clubs.length);
  });

  it('findOne should return a club by id', async () => {
    const storedClub: Club = clubsList[0];
    const club: Club = await service.findOne(storedClub.id);
    expect(club).not.toBeNull();
    expect(club.nombre).toEqual(storedClub.nombre);
    // expect(club.fechaFundacion).toEqual(storedClub.fechaFundacion);
    expect(club.imageUrl).toEqual(storedClub.imageUrl);
    expect(club.descripcion).toEqual(storedClub.descripcion);
  });

  it('findOne should throw an exception for an invalid club', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('create should return a new club', async () => {
    const club: Club = {
      id: '',
      nombre: faker.company.name(),
      fechaFundacion: faker.date.past(),
      imageUrl: faker.image.imageUrl(),
      descripcion: 'descripcion',
      socios: [],
    };

    const newClub: Club = await service.create(club);
    expect(newClub).not.toBeNull();

    const storedClub: Club = await repository.findOne({
      where: { id: club.id },
    });

    expect(storedClub).not.toBeNull();
    expect(storedClub.nombre).toEqual(club.nombre);
    // expect(storedClub.fechaFundacion).toEqual(club.fechaFundacion);
    expect(storedClub.imageUrl).toEqual(club.imageUrl);
    expect(storedClub.descripcion).toEqual(club.descripcion);
  });

  it('update should modify a club', async () => {
    const club: Club = clubsList[0];
    club.nombre = 'New name';
    club.descripcion = 'New description';

    const updatedClub: Club = await service.update(club.id, club);
    expect(updatedClub).not.toBeNull();

    const storedClub: Club = await repository.findOne({
      where: { id: club.id },
    });
    expect(storedClub).not.toBeNull();
    expect(storedClub.nombre).toEqual(club.nombre);
    expect(storedClub.descripcion).toEqual(club.descripcion);
  });

  it('update should throw an exception for an invalid club', async () => {
    let club: Club = clubsList[0];
    club = {
      ...club,
      nombre: 'New name',
      descripcion: 'New description',
    };
    await expect(() => service.update('0', club)).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('delete should remove a club', async () => {
    const club: Club = clubsList[0];
    await service.delete(club.id);

    const deleteClub: Club = await repository.findOne({
      where: { id: club.id },
    });
    expect(deleteClub).toBeNull();
  });

  it('delete should throw an exception for an invalid club', async () => {
    const clubs: Club = clubsList[0];
    await service.delete(clubs.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });
});
