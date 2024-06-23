import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { AnimalPicturesService } from './animalPictures.service';
import { CreateAnimalPictureDto } from './dto/create-animalPicture.dto';
import { UpdateAnimalPictureDto } from './dto/update-animalPicture.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';

@Controller('animalPictures')
export class AnimalPicturesController {
    constructor(private readonly animalPicturesService: AnimalPicturesService) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.animalPicturesService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.animalPicturesService.findAll();
    }
  
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@Body() createAnimalPictureDto: CreateAnimalPictureDto) {
        return this.animalPicturesService.create(createAnimalPictureDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateAnimalPictureDto: UpdateAnimalPictureDto) {
        return this.animalPicturesService.update(id, updateAnimalPictureDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.animalPicturesService.remove(id);
    }
}
