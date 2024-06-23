import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AnimalPicture } from './entities/animalPicture.entity';
import { Repository } from 'typeorm';
import { CreateAnimalPictureDto } from './dto/create-animalPicture.dto';
import { UpdateAnimalPictureDto } from './dto/update-animalPicture.dto';

@Injectable()
export class AnimalPicturesService {
  @Inject('ANIMALPICTURES_REPOSITORY')
  private animalPicutreRepository: Repository<AnimalPicture>;

  
  async findAll() {
    return this.animalPicutreRepository.find();
  }

  async findOne(id: string) {
    const animalPicutre = await this.animalPicutreRepository.findOne({
      where: { id }
    });

    if (!animalPicutre) {
      throw new NotFoundException(`AnimalPicutre ID ${id} not found`);
    }

    return animalPicutre;
  }

  async create(createAnimalPictureDto: CreateAnimalPictureDto) {
    const animalPicutre = this.animalPicutreRepository.create(createAnimalPictureDto);
    return this.animalPicutreRepository.save(animalPicutre);
  }

  async update(id: string, updateAnimalPictureDto: UpdateAnimalPictureDto) {
    updateAnimalPictureDto.updated_at = new Date();
    const animalPicutre = await this.animalPicutreRepository.preload({
      id,
      ...updateAnimalPictureDto
    });

    if (!animalPicutre) {
      throw new NotFoundException(`AnimalPicutre ID ${id} not found`);
    }

    return this.animalPicutreRepository.save(animalPicutre);
  }

  async remove(id: string) {
    const animalPicture = await this.animalPicutreRepository.findOne({
      where: { id },
    });
  
    if (!animalPicture) {
      throw new NotFoundException(`AnimalPicture ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadanimalPicture = await this.animalPicutreRepository.preload({
      id,
      deleted_at: date
    });

    return this.animalPicutreRepository.save(preloadanimalPicture)
  }
}
