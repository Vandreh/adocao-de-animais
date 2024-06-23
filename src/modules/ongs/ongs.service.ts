import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ONG } from './entities/ong.entity';
import { Repository } from 'typeorm';
import { CreateONGDto } from './dto/create-ong.dto';
import { UpdateONGDto } from './dto/update-ong.dto';

@Injectable()
export class ONGsService {
  @Inject('ONGS_REPOSITORY')
  private ongRepository: Repository<ONG>;

  
  async findAll() {
    return this.ongRepository.find({
      relations: ['ongNotifications', 'animals', 'events']
    });
  }

  async findOne(id: string) {
    const ong = await this.ongRepository.findOne({
      where: { user_id: id },
      relations: ['ongNotifications', 'animals', 'events']
    });
    if (!ong) {
      throw new NotFoundException(`ONG ID ${id} not found`);
    }
    return ong;
  }

  async findOneById(id: string) {
    const ong = await this.ongRepository.findOne({
      where: { id },
      relations: ['ongNotifications', 'animals', 'events']
    });
    if (!ong) {
      throw new NotFoundException(`ONG ID ${id} not found`);
    }
    return ong;
  }
 
  async create(data: CreateONGDto): Promise<ONG> {
    try {
      const savedONG = this.ongRepository.create(data);
      if (!savedONG) throw new NotFoundException('Usuario ja tem um ONG');
      return this.ongRepository.save(savedONG);
    } catch (error) {
      throw new Error(error);
    }
  }

  
  
  async uploadAvatar(id: string, title: string): Promise<ONG> {
    const updated_at = new Date();
    const pre_ong = await this.ongRepository.preload({
      id,
      avatar: title,
      updated_at
    });

    if (!pre_ong) {
      throw new NotFoundException(`ONG ID ${id} not found`);
    }

    return this.ongRepository.save(pre_ong);
  }

  async uploadBanner(id: string, title: string): Promise<ONG> {
    const updated_at = new Date();
    const pre_ong = await this.ongRepository.preload({
      id,
      banner: title,
      updated_at
    });

    if (!pre_ong) {
      throw new NotFoundException(`ONG ID ${id} not found`);
    }

    return this.ongRepository.save(pre_ong);
  }

  async remove(id: string) {
      const ong = await this.ongRepository.findOne({
        where: { user_id: id },
      });
    
      if (!ong) {
        throw new NotFoundException(`ONG ID ${id} not found`);
      }
    
      const date = new Date();
      const preloadOng = await this.ongRepository.preload({
        id: ong.id,
        deleted_at: date
      });

      return this.ongRepository.save(preloadOng)
    }

  async update(id: string, updateONGDto: UpdateONGDto) {
    updateONGDto.updated_at = new Date()
    const ong = await this.ongRepository.preload({
      id,
      ...updateONGDto
    });

    if (!ong) {
      throw new NotFoundException(`ONG ID ${id} not found`);
    }

    return this.ongRepository.save(ong);
  }
}
