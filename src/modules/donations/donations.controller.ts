import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';

@Controller('donations')
export class DonationsController {
    constructor(private readonly donationsService: DonationsService) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.donationsService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.donationsService.findAll();
    }
  
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@GetCurrentUserId() userId: string, @Body() createDonationDto: CreateDonationDto) {
        return this.donationsService.create(userId, createDonationDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto) {
        return this.donationsService.update(id, updateDonationDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.donationsService.remove(id);
    }
}
