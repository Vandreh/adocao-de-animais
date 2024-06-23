import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Tutor } from './entities/tutor.entity';
import { Repository } from 'typeorm';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';

@Injectable()
export class TutorsService {
  @Inject('TUTORS_REPOSITORY')
  private tutorRepository: Repository<Tutor>;
  
  async findAll() {
    return this.tutorRepository.find({
      relations: ['tutorNotifications']
    });
  }

  async findOne(id: string) {
    const tutor = await this.tutorRepository.findOne({
      where: { user_id: id },
      relations: ['tutorNotifications']
    });

    if (!tutor) {
      throw new NotFoundException(`Tutor ID ${id} not found`);
    }

    return tutor;
  }
 
  async create(data: CreateTutorDto): Promise<Tutor> {
    try {
      const savedTutor = this.tutorRepository.create(data);
      if (!savedTutor) throw new NotFoundException('Usuario ja tem um tutor');
      return this.tutorRepository.save(savedTutor);
    } catch (error) {
      throw new Error(error);
    }
  }

  
  async remove(id: string) { 
    const tutor = await this.tutorRepository.findOne({
      where: { user_id: id },
    });
    if (!tutor) {
      throw new NotFoundException(`Tutor ID ${id} not found`);
    }
    const date = new Date();
    const updatedTutor = await this.tutorRepository.preload({
      id: tutor.id,
      deleted_at: date
    });

    return this.tutorRepository.save(updatedTutor);
  }

  
  async uploadAvatar(id: string, title: string): Promise<Tutor> {
    const updated_at = new Date();
    const pretutor = await this.tutorRepository.preload({
      id,
      avatar: title,
      updated_at
    });

    if (!pretutor) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.tutorRepository.save(pretutor);
  }

  async uploadBanner(id: string, title: string): Promise<Tutor> {
    const updated_at = new Date();
    const pretutor = await this.tutorRepository.preload({
      id,
      banner: title,
      updated_at
    });

    if (!pretutor) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.tutorRepository.save(pretutor);
  }

  async update(id: string, updateTutorDto: UpdateTutorDto) {
    updateTutorDto.updated_at = new Date();
    const tutor = await this.tutorRepository.preload({
      id,
      ...updateTutorDto
    });

    if (!tutor) {
      throw new NotFoundException(`Tutor ID ${id} not found`);
    }

    return this.tutorRepository.save(tutor);
  }
}
