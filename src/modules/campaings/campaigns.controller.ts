import { Body, Controller, Get, Param, Post, Patch, Delete, UseInterceptors, UploadedFile, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { join } from 'path';

import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';
import { deleteFile } from '../../utils/deleteFile';
import { ONGsService } from '../ongs/ongs.service';
import { Campaign } from './entities/campaign.entity';

export const picture = {
    storage: diskStorage({
        destination: './uploads/campaigns',
        filename: async (req, file, cb) => {
            const fileHash =  Date.now();
            const fileName = `${fileHash}-${file.originalname}`;
            cb(null, fileName)
        }
    })
}

@Controller('campaigns')
export class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService,
        private readonly ongsService: ONGsService
        ) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.campaignsService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.campaignsService.findAll();
    }
  
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@GetCurrentUserId() userId: string, @Body() createCampaignDto: CreateCampaignDto) {
        return this.campaignsService.create(userId, createCampaignDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
        return this.campaignsService.update(id, updateCampaignDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.campaignsService.remove(id);
    }

    @Post('upload/picture')
    @Roles(Role.TUTOR, Role.ONG)
    @UseInterceptors(FileInterceptor('file', picture))
    async uploadAvatar(@GetCurrentUserId() userId: string, @UploadedFile() file): Promise<Campaign> {
        const ong = await this.ongsService.findOne(userId);
        if (!ong) {
            throw new NotFoundException(`ONG ID ${userId} not found`);
          }
        const event = await this.campaignsService.findOneByONGId(ong.id);
        if (event.picture) {
            try {
                await deleteFile(`./uploads/campaigns/${event.picture}`);
            } catch (error) {
                throw new Error(error)
            }
        }
        return this.campaignsService.uploadPicture(event.id, file.filename);
    }

    @Get('picture/:imagename')
    @Roles(Role.TUTOR, Role.ONG)
    findAvatar(@Param('imagename') imagename, @Res() res): Observable<Object> {
        try {
            return of(res.sendFile(join(process.cwd(), 'uploads/campaigns/' + imagename)));
        } catch (error) {
            throw new Error(error)            
        }
    }
}
