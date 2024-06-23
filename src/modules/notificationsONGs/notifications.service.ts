import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ONGNotification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  @Inject('NOTIFICATIONS_REPOSITORY')
  private notificationRepository: Repository<ONGNotification>;

  
  async findAll() {
    return this.notificationRepository.find();
  }

  async findOne(id: string) {
    const notification = await this.notificationRepository.findOne({
      where: { id }
    });

    if (!notification) {
      throw new NotFoundException(`Notification ID ${id} not found`);
    }

    return notification;
  }

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(createNotificationDto);
    return this.notificationRepository.save(notification);
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    updateNotificationDto.updated_at = new Date();
    const notification = await this.notificationRepository.preload({
      id,
      ...updateNotificationDto
    });

    if (!notification) {
      throw new NotFoundException(`Notification ID ${id} not found`);
    }

    return this.notificationRepository.save(notification);
  }

  async remove(id: string) {
    const ONGnotification = await this.notificationRepository.findOne({
      where: { id },
    });
  
    if (!ONGnotification) {
      throw new NotFoundException(`Notification ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadONGNotification = await this.notificationRepository.preload({
      id,
      deleted_at: date
    });

    return this.notificationRepository.save(preloadONGNotification)
  }
  // async remove(id: string) {
  //   const notification = await this.notificationRepository.findOne({
  //     where: { id }
  //   });

  //   if (!notification) {
  //     throw new NotFoundException(`Notification ID ${id} not found`);
  //   }

  //   return this.notificationRepository.remove(notification);
  // }
}
