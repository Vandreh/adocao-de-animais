import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  @Inject('ANIMALS_REPOSITORY')
  private animalRepository: Repository<Animal>;

  
  async findAll() {
    return this.animalRepository.find({
      relations: ['animalPictures']
    });
  }

  async findOne(id: string) {
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['animalPictures']
    });

    if (!animal) {
      throw new NotFoundException(`Animal ID ${id} not found`);
    }

    return animal;
  }

  async findByOngId(id: string) {
    const animal = await this.animalRepository.findOne({
      where: { ongId: id }
    });

    if (!animal) {
      throw new NotFoundException(`Animal ID ${id} not found`);
    }

    return animal;
  }

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = this.animalRepository.create(createAnimalDto);
    const savedAnimal = await this.animalRepository.save(animal);
    return savedAnimal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    updateAnimalDto.updated_at = new Date();
    const animal = await this.animalRepository.preload({
      id,
      ...updateAnimalDto
    });

    if (!animal) {
      throw new NotFoundException(`Animal ID ${id} not found`);
    }

    return this.animalRepository.save(animal);
  }

  async remove(id: string) {
    const animal = await this.animalRepository.findOne({
      where: { id },
    });
  
    if (!animal) {
      throw new NotFoundException(`Animal ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadAnimal = await this.animalRepository.preload({
      id,
      deleted_at: date
    });

    return this.animalRepository.save(preloadAnimal)
  }

  async uploadAvatar(id: string, title: string): Promise<Animal> {
    const updated_at = new Date()
    const pre_animal = await this.animalRepository.preload({
      id,
      avatar: title,
      updated_at
    });

    if (!pre_animal) {
      throw new NotFoundException(`ONG ID ${id} not found`);
    }

    return this.animalRepository.save(pre_animal);
  }
}
