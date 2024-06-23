import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { PatronizeService } from './patronizes.service';
import { CreatePatronizeDto } from './dto/create-patronize.dto';
import { UpdatePatronizeDto } from './dto/update-patronize.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';

@Controller('patronizes')
export class PatronizeController {
    constructor(private readonly patronizeService: PatronizeService) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.patronizeService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.patronizeService.findAll();
    }
  
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@GetCurrentUserId() userId: string, @Body() createPatronizeDto: CreatePatronizeDto) {
        return this.patronizeService.create(userId, createPatronizeDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updatePatronizeDto: UpdatePatronizeDto) {
        return this.patronizeService.update(id, updatePatronizeDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.patronizeService.remove(id);
    }
}
