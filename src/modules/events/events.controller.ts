import { Body, Controller, Get, Param, Post, Patch, Delete, UseInterceptors, UploadedFile, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { join } from 'path';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';
import { deleteFile } from '../../utils/deleteFile';
import { ONGsService } from '../ongs/ongs.service';
import { Event } from './entities/event.entity';

export const avatars = {
    storage: diskStorage({
        destination: './uploads/events',
        filename: async (req, file, cb) => {
            const fileHash =  Date.now();
            const fileName = `${fileHash}-${file.originalname}`;
            cb(null, fileName)
        }
    })
}

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
        private readonly ongsService: ONGsService
        ) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.eventsService.findAll();
    }
  
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventsService.update(id, updateEventDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.eventsService.remove(id);
    }

    @Post('upload/picture')
    @Roles(Role.TUTOR, Role.ONG)
    @UseInterceptors(FileInterceptor('file', avatars))
    async uploadAvatar(@GetCurrentUserId() userId: string, @UploadedFile() file): Promise<Event> {
        const ong = await this.ongsService.findOne(userId);
        if (!ong) {
            throw new NotFoundException(`ONG ID ${userId} not found`);
          }
        const event = await this.eventsService.findOneByONGId(ong.id);
        if (event.picture) {
            try {
                await deleteFile(`./uploads/events/${event.picture}`);
            } catch (error) {
                throw new Error(error)
            }
        }
        return this.eventsService.uploadPicture(event.id, file.filename);
    }

    @Get('picture/:imagename')
    @Roles(Role.TUTOR, Role.ONG)
    findAvatar(@Param('imagename') imagename, @Res() res): Observable<Object> {
        try {
            return of(res.sendFile(join(process.cwd(), 'uploads/events/' + imagename)));
        } catch (error) {
            throw new Error(error)
        }
    }
}
