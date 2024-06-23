import { Body, Controller, Get, Param, Post, Patch, Delete, UnauthorizedException, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { AnimalsService } from './animals.service';
// import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUser, GetCurrentUserId } from '../hash/common/decorators';
import { ONGsService } from '../ongs/ongs.service';
import { JwtPayload } from '../hash/types';
import { Animal } from './entities/animal.entity';
import { deleteFile } from '../../utils/deleteFile';
import { AnimalPicturesService } from '../animalPictures/animalPictures.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { CreateAnimalPictureDto } from '../animalPictures/dto/create-animalPicture.dto';

export const avatars = {
    storage: diskStorage({
        destination: './uploads/animals/avatars',
        filename: async (req, file, cb) => {
            const fileHash =  Date.now();
            const fileName = `${fileHash}-${file.originalname}`;
            cb(null, fileName)
        }
    })
}
export const animalPicture = {
    storage: diskStorage({
        destination: './uploads/animals/animalPictures',
        filename: async (req, file, cb) => {
            const fileHash =  Date.now();
            const fileName = `${fileHash}-${file.originalname}`;
            cb(null, fileName)
        }
    })
}

@Controller('animals')
export class AnimalsController {
    constructor(
        private readonly animalsService: AnimalsService,
        private readonly ongsService: ONGsService,
        private readonly aniamlPicturesService: AnimalPicturesService
    ) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.animalsService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.animalsService.findAll();
    }

    @Post()
    @Roles(Role.ONG)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 5 }], animalPicture))
    async create(@GetCurrentUser() user: JwtPayload, @Body() createAnimalDto: any/* CreateAnimalDto */, @UploadedFiles() files: { file?: Express.Multer.File[] }) {
        if (createAnimalDto['values']) {
            createAnimalDto = JSON.parse(createAnimalDto['values'])
        }
        createAnimalDto as CreateAnimalDto;
        if (user && (user.role  === 'Ong')) {
            try {
                const ong = await this.ongsService.findOne(user.user_id);
                createAnimalDto.ongId = ong.id;
                createAnimalDto.shelterEnterDate = new Date();
                
                const animal = await this.animalsService.create(createAnimalDto);
                if (files) {
                    const picture = new CreateAnimalPictureDto;
                    picture.animalId = animal.id;
                    files.file.map(file => {
                         picture.filename = file.filename;
                         this.aniamlPicturesService.create(picture);
                    });
                }
                
                return animal;
            } catch (error) {
                throw new Error(error);              
            }
        }
        throw new UnauthorizedException();
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
        return this.animalsService.update(id, updateAnimalDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.animalsService.remove(id);
    }

    @Post('upload/avatar')
    @Roles(Role.TUTOR, Role.ONG)
    @UseInterceptors(FileInterceptor('file', avatars))
    async uploadAvatar(@GetCurrentUserId() userId: string, @UploadedFile() file: Express.Multer.File): Promise<Animal> {
        const ong = await this.ongsService.findOne(userId)
        const animal = await this.animalsService.findByOngId(ong.id);
        if (animal.avatar) {
            try {
                await deleteFile(`./uploads/animals/avatars/${animal.avatar}`);
            } catch (error) {
                throw new Error(error)
            }
        }
        return this.animalsService.uploadAvatar(animal.id, file.filename);
    }
}
