import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';

import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';

@Controller('adoptions')
export class AdoptionsController {
    constructor(private readonly adoptionsService: AdoptionsService) {}

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.adoptionsService.findAll();
    }

    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.adoptionsService.findOne(id);
    }
  
    @Post()
    @Roles(Role.TUTOR)
    create(@GetCurrentUserId() userId: string, @Body() createAdoptionDto: CreateAdoptionDto) {
        return this.adoptionsService.create(userId, createAdoptionDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateAdoptionDto: UpdateAdoptionDto) {
        return this.adoptionsService.update(id, updateAdoptionDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.adoptionsService.remove(id);
    }
}
