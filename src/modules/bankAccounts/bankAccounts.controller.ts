import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { BankAccountsService } from './bankAccounts.service';
import { CreateBankAccountDto } from './dto/create-bankAccount.dto';
import { UpdateBankAccountDto } from './dto/update-bankAccount.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';

@Controller('bankAccounts')
export class BankAccountsController {
    constructor(private readonly bankAccountsService: BankAccountsService) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.bankAccountsService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.bankAccountsService.findAll();
    }
  
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@GetCurrentUserId() userId: string, @Body() createBankAccountDto: CreateBankAccountDto) {
        return this.bankAccountsService.create(userId, createBankAccountDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateBankAccountDto: UpdateBankAccountDto) {
        return this.bankAccountsService.update(id, updateBankAccountDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.bankAccountsService.remove(id);
    }
}
