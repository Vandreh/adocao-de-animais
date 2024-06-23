import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';

import { Role } from '../../roles/role.enum';
import { Roles } from '../../roles/roles.decorator';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly AddressService: AddressService) {}
    
    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {
        return this.AddressService.findAll();
    }
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.AddressService.findOne(id);
    }
    
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@Body() createAddressDto: CreateAddressDto) {
        return this.AddressService.create(createAddressDto);
    }

    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
        return this.AddressService.update(id, updateAddressDto);
    }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //      return this.AddressService.remove(id);
    // }
}
