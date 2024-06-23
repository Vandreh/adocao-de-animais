import { Controller, Get, Param, Post, UseInterceptors, UploadedFile, Res, Delete, Patch, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { join } from 'path';

import { GetCurrentUserId } from '../hash/common/decorators';
import { ONGsService } from './ongs.service';
import { ONG } from './entities/ong.entity';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { UpdateONGDto } from './dto/update-ong.dto';
import { deleteFile } from '../../utils/deleteFile';

export const avatars = {
    storage: diskStorage({
        destination: './uploads/ongs/avatars',
        filename: async (req, file, cb) => {
            const fileHash =  Date.now();
            const fileName = `${fileHash}-${file.originalname}`;
            cb(null, fileName)
        }
    })
}
export const banners = {
    storage: diskStorage({
        destination: './uploads/ongs/banners',
        filename: async (req, file, cb) => {
            const fileHash =  Date.now();
            const fileName = `${fileHash}-${file.originalname}`;
            cb(null, fileName)
        }
    })
}

@Controller('ongs')
export class ONGsController {
    constructor(
        private readonly ongsService: ONGsService,
    ) {}
     
    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll(): Promise<ONG[]> {
        return this.ongsService.findAll();
    }
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string): Promise<ONG> {
        return this.ongsService.findOne(id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateONGDto: UpdateONGDto): Promise<ONG> {
        return this.ongsService.update(id, updateONGDto);
    }
    
    @Post('upload/avatar')
    @Roles(Role.TUTOR, Role.ONG)
    @UseInterceptors(FileInterceptor('file', avatars))
    async uploadAvatar(@GetCurrentUserId() userId: string, @UploadedFile() file): Promise<ONG> {
        const ong = await this.ongsService.findOne(userId);
        if (ong.avatar) {
            try {
                await deleteFile(`./uploads/ongs/avatars/${ong.avatar}`);
            } catch (error) {
                throw new Error(error)
            }
        }
        return this.ongsService.uploadAvatar(ong.id, file.filename);
    }

    @Post('upload/banner')
    @Roles(Role.TUTOR, Role.ONG)
    @UseInterceptors(FileInterceptor('file', banners))
    async uploadBanner(@GetCurrentUserId() userId: string, @UploadedFile() file): Promise<ONG> {
        const ong = await this.ongsService.findOne(userId);
        if (ong.banner) {
            try {
                await deleteFile(`./uploads/ongs/banners/${ong.banner}`);
            } catch (error) {
                throw new Error(error)
            }
        }
        return this.ongsService.uploadBanner(ong.id, file.filename);
    }

    @Get('avatar/:imagename')
    @Roles(Role.TUTOR, Role.ONG)
    findAvatar(@Param('imagename') imagename, @Res() res): Observable<Object> {
        try {
            return of(res.sendFile(join(process.cwd(), 'uploads/ongs/avatars/' + imagename)));
        } catch (error) {
            throw new Error(error)
        }
    }
    @Get('banner/:imagename')
    @Roles(Role.TUTOR, Role.ONG)
    findBanner(@Param('imagename') imagename, @Res() res): Observable<Object> {
        try {
            return of(res.sendFile(join(process.cwd(), 'uploads/ongs/banners/' + imagename)));
        } catch (error) {
            throw new Error(error)
        }
    }

    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string): Promise<ONG> {
         return this.ongsService.remove(id);
    }
}
