import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Patronize } from './entities/patronize.entity';
import { CreatePatronizeDto } from './dto/create-patronize.dto';
import { UpdatePatronizeDto } from './dto/update-patronize.dto';
import { TutorsService } from '../tutors/tutors.service';

@Injectable()
export class PatronizeService {
  @Inject('PATRONIZES_REPOSITORY')
  private patronizeRepository: Repository<Patronize>;

  constructor(private readonly tutorsService: TutorsService) {}

  async findAll() {
    return this.patronizeRepository.find();
  }

  async findOne(id: string) {
    const patronize = await this.patronizeRepository.findOne({
      where: { id }
    });
    if (!patronize) {
      throw new NotFoundException(`Patronize ID ${id} not found`);
    }
    return patronize;
  }

  async findOneBytutorId(id: string) {
    const patronize = await this.patronizeRepository.findOne({
      where: { tutorId: id }
    });
    if (!patronize) {
      throw new NotFoundException(`Patronize ID ${id} not found`);
    }
    return patronize;
  }

  async create(userId: string, createPatronizeDto: CreatePatronizeDto) {
    try {
      const tutor = await this.tutorsService.findOne(userId);
      createPatronizeDto.tutorId = tutor.id;
      const patronize = this.patronizeRepository.create(createPatronizeDto);
      return this.patronizeRepository.save(patronize);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updatePatronizeDto: UpdatePatronizeDto) {
    updatePatronizeDto.updated_at = new Date();
    const patronize = await this.patronizeRepository.preload({
      id,
      ...updatePatronizeDto
    });
    if (!patronize) {
      throw new NotFoundException(`Patronize ID ${id} not found`);
    }
    return this.patronizeRepository.save(patronize);
  }

  async remove(id: string) {
    const patronize = await this.patronizeRepository.findOne({
      where: { id },
    });
    if (!patronize) {
      throw new NotFoundException(`Patronize ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadpatronize = await this.patronizeRepository.preload({
      id,
      deleted_at: date
    });
    return this.patronizeRepository.save(preloadpatronize)
  }
}
