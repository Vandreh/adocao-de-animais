import { Controller, Get, Param, Post, UseInterceptors, UploadedFile, Res, Patch, Body, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { join } from 'path';

import { GetCurrentUserId } from '../hash/common/decorators';
import { TutorsService } from './tutors.service';
import { Tutor } from './entities/tutor.entity';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { deleteFile } from '../../utils/deleteFile';


export const avatars = {
    storage: diskStorage({
        destination: './uploads/tutors/avatars',
        filename: async (req, file, cb) => {
            const fileHash =  Date.now() //await bcrypt.genSalt();
            const fileName = `${fileHash}-${file.originalname}`;
            cb(null, fileName)
        }
    })
}
export const banners = {
    storage: diskStorage({
        destination: './uploads/tutors/banners',
        filename: async (req, file, cb) => {
            const fileHash =  Date.now() //await bcrypt.genSalt();
            const fileName = `${fileHash}-${file.originalname}`;
            cb(null, fileName)
        }
    })
}

@Controller('tutors')
export class TutorsController {
    constructor(
        private readonly tutorsService: TutorsService
    ) {}
    
    @Get()
    @Roles(Role.TUTOR, Role.ONG, Role.ADMIN, Role.EDITOR)
    findAll() {
        return this.tutorsService.findAll();
    }

    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG, Role.ADMIN, Role.EDITOR)
    findOne(@Param('id') id: string) {
        return this.tutorsService.findOne(id);
    }

    @Post('upload/avatar')
    @Roles(Role.TUTOR, Role.ONG)
    @UseInterceptors(FileInterceptor('file', avatars))
    async uploadAvatar(@GetCurrentUserId() userId: string, @UploadedFile() file): Promise<Tutor> {
        const tutor = await this.tutorsService.findOne(userId);
        if (tutor.avatar) {
            try {
                await deleteFile(`./uploads/tutors/avatars/${tutor.avatar}`);
            } catch (error) {
                throw new Error(error)
            }
        }
        return this.tutorsService.uploadAvatar(tutor.id, file.filename);
    }

    @Post('upload/banner')
    @Roles(Role.TUTOR, Role.ONG)
    @UseInterceptors(FileInterceptor('file', banners))
    async uploadBanner(@GetCurrentUserId() userId: string, @UploadedFile() file): Promise<Tutor> {
        const tutor = await this.tutorsService.findOne(userId);
        if (tutor.banner) {
            try {
                await deleteFile(`./uploads/tutors/banners/${tutor.banner}`);
            } catch (error) {
                throw new Error(error)
            }
        }
        return this.tutorsService.uploadBanner(tutor.id, file.filename);
    }

    @Get('avatar/avatar/:imagename')
    @Roles(Role.TUTOR, Role.ONG)
    findAvatar(@Param('imagename') imagename, @Res() res): Observable<Object> {
        try {
            return of(res.sendFile(join(process.cwd(), 'uploads/tutors/avatars/' + imagename)));
        } catch (error) {
            throw new Error(error)
        }
    }
    
    @Get('avatar/banner/:imagename')
    @Roles(Role.TUTOR, Role.ONG)
    findBanner(@Param('imagename') imagename, @Res() res): Observable<Object> {
        try {
            return of(res.sendFile(join(process.cwd(), 'uploads/tutors/banners/' + imagename)));
        } catch (error) {
            throw new Error(error)            
        }
    }

    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
        return this.tutorsService.update(id, updateTutorDto);
    }
    
    @Delete(':id')
    @Roles(Role.TUTOR, )
    remove(@Param('id') id: string) {
         return this.tutorsService.remove(id);
    }
}
