import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { SignaturesService } from './signatures.service';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';

@Controller('signatures')
export class SignaturesController {
    constructor(private readonly donationsService: SignaturesService) {}
    
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
    create(@Body() createSignatureDto: CreateSignatureDto) {
        return this.donationsService.create(createSignatureDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateSignatureDto: UpdateSignatureDto) {
        return this.donationsService.update(id, updateSignatureDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.donationsService.remove(id);
    }
}
