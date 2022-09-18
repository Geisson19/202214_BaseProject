import { Test, TestingModule } from '@nestjs/testing';
import { SocioService } from './socio.service';
import { Repository } from 'typeorm';
import { Socio } from './entities/socio.entity';
import { TypeOrmTestingConfig } from '../shared/utils/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('SocioService', () => {
  let service: SocioService;
  let repository: Repository<Socio>;
  let sociosList: Socio[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SocioService],
    }).compile();

    service = module.get<SocioService>(SocioService);
    repository = module.get<Repository<Socio>>(getRepositoryToken(Socio));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    sociosList = [];
    for (let i = 0; i < 5; i++) {
      const socio: Socio = await repository.save({
        nombre: faker.name.firstName(),
        correo: faker.internet.email(),
        fechaNacimiento: faker.date.past(),
      });
      sociosList.push(socio);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all socios', async () => {
    const socios: Socio[] = await service.findAll();
    expect(socios).not.toBeNull();
    expect(socios).toHaveLength(sociosList.length);
  });

  it('findOne should return a socio by id', async () => {
    const storedMuseum: Socio = sociosList[0];
    const socio: Socio = await service.findOne(storedMuseum.id);
    expect(socio).not.toBeNull();
    expect(socio.nombre).toEqual(storedMuseum.nombre);
    expect(socio.correo).toEqual(storedMuseum.correo);
  });

  it('findOne should throw an exception for an invalid socio', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The socio with the given id was not found',
    );
  });

  it('create should return a new socio', async () => {
    const socio: Socio = {
      id: '',
      nombre: faker.name.firstName(),
      correo: faker.internet.email(),
      fechaNacimiento: faker.date.past(),
      club: null,
    };

    const newSocio: Socio = await service.create(socio);
    expect(newSocio).not.toBeNull();

    const storedMuseum: Socio = await repository.findOne({
      where: { id: socio.id },
    });

    expect(storedMuseum).not.toBeNull();
    expect(storedMuseum.nombre).toEqual(newSocio.nombre);
    expect(storedMuseum.correo).toEqual(newSocio.correo);
  });

  it('update should modify a socio', async () => {
    const socio: Socio = sociosList[0];
    socio.nombre = 'New name';
    socio.correo = 'nuevo@correo.com';

    const updatedMuseum: Socio = await service.update(socio.id, socio);
    expect(updatedMuseum).not.toBeNull();

    const storedMuseum: Socio = await repository.findOne({
      where: { id: socio.id },
    });
    expect(storedMuseum).not.toBeNull();
    expect(storedMuseum.nombre).toEqual(updatedMuseum.nombre);
    expect(storedMuseum.correo).toEqual(updatedMuseum.correo);
  });

  it('update should throw an exception for an invalid socio', async () => {
    let socio: Socio = sociosList[0];
    socio = {
      ...socio,
      nombre: 'New name',
      correo: 'new@correo.com',
    };
    await expect(() => service.update('0', socio)).rejects.toHaveProperty(
      'message',
      'The socio with the given id was not found',
    );
  });

  it('delete should remove a socio', async () => {
    const socio: Socio = sociosList[0];
    await service.delete(socio.id);

    const deletedMuseum: Socio = await repository.findOne({
      where: { id: socio.id },
    });
    expect(deletedMuseum).toBeNull();
  });

  it('delete should throw an exception for an invalid socio', async () => {
    const socio: Socio = sociosList[0];
    await service.delete(socio.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The socio with the given id was not found',
    );
  });
});
