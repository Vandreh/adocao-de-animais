import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard1';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';

@Controller('tutorsNotifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}
    
    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.notificationsService.findAll();
    }
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.notificationsService.findOne(id);
    }

    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationsService.create(createNotificationDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
        return this.notificationsService.update(id, updateNotificationDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.notificationsService.remove(id);
    }
}
