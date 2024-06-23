import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { CreditCardsService } from './creditCards.service';
import { CreateCreditCardDto } from './dto/create-creditCard.dto';
import { UpdateCreditCardDto } from './dto/update-creditCard.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';

@Controller('creditCards')
export class CreditCardsController {
    constructor(private readonly creditCardsService: CreditCardsService) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.creditCardsService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.creditCardsService.findAll();
    }
  
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@GetCurrentUserId() userId: string, @Body() createCreditCardDto: CreateCreditCardDto) {
        return this.creditCardsService.create(userId, createCreditCardDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateCreditCardDto: UpdateCreditCardDto) {
        return this.creditCardsService.update(id, updateCreditCardDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.creditCardsService.remove(id);
    }
}
