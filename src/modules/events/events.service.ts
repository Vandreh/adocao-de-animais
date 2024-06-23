import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  @Inject('EVENTS_REPOSITORY')
  private eventRepository: Repository<Event>;

  
  async findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id }
    });
    if (!event) {
      throw new NotFoundException(`Event ID ${id} not found`);
    }
    return event;
  }

  async findOneByONGId(id: string) {
    const event = await this.eventRepository.findOne({
      where: { ongId: id }
    });
    if (!event) {
      throw new NotFoundException(`Event ID ${id} not found`);
    }
    return event;
  }

  async create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    updateEventDto.updated_at = new Date();
    const event = await this.eventRepository.preload({
      id,
      ...updateEventDto
    });

    if (!event) {
      throw new NotFoundException(`Event ID ${id} not found`);
    }

    return this.eventRepository.save(event);
  }

  async remove(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
    });
  
    if (!event) {
      throw new NotFoundException(`event ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadEvent = await this.eventRepository.preload({
      id,
      deleted_at: date
    });

    return this.eventRepository.save(preloadEvent)
  }

  async uploadPicture(id: string, title: string): Promise<Event> {
    const updated_at = new Date();
    const preloadEvent = await this.eventRepository.preload({
      id,
      picture: title,
      updated_at
    });

    if (!preloadEvent) {
      throw new NotFoundException(`Event ID ${id} not found`);
    }

    return this.eventRepository.save(preloadEvent);
  }
}
