import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Adoption } from './entities/adoption.entity';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { TutorsService } from '../tutors/tutors.service';

@Injectable()
export class AdoptionsService {
  @Inject('ADOPTIONS_REPOSITORY')
  private adoptionRepository: Repository<Adoption>;
  constructor (private readonly tutorsService: TutorsService) {}
  
  async findAll() {
    return this.adoptionRepository.find();
  }

  async findOne(id: string) {
    const adoption = await this.adoptionRepository.findOne({
      where: { id }
    });

    if (!adoption) {
      throw new NotFoundException(`Adoption ID ${id} not found`);
    }

    return adoption;
  }

  async create(id: string, createAdoptionDto: CreateAdoptionDto) {
    try {
      const tutor = await this.tutorsService.findOne(id);
      createAdoptionDto.tutorId = tutor.id;
      createAdoptionDto.requestDate = new Date();
      const adoption = this.adoptionRepository.create(createAdoptionDto);
      return this.adoptionRepository.save(adoption);
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: string, updateAdoptionDto: UpdateAdoptionDto) {
    try {
      updateAdoptionDto.updated_at = new Date();
      const adoption = await this.adoptionRepository.preload({
        id,
        ...updateAdoptionDto
      });
      if (!adoption) {
        throw new NotFoundException(`Adoption ID ${id} not found`);
      }
      return this.adoptionRepository.save(adoption);
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id: string) {
    const adoption = await this.adoptionRepository.findOne({
      where: { id },
    });
  
    if (!adoption) {
      throw new NotFoundException(`Adoption ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadAdoption = await this.adoptionRepository.preload({
      id,
      deleted_at: date
    });

    return this.adoptionRepository.save(preloadAdoption)
  }
}
