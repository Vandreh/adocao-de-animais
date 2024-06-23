import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { Roles } from '../../roles/roles.decorator';
import { Role } from '../../roles/role.enum';
import { GetCurrentUserId } from '../hash/common/decorators';

@Controller('receipts')
export class ReceiptsController {
    constructor(private readonly receiptsService: ReceiptsService) {}
    
    @Get(':id')
    @Roles(Role.TUTOR, Role.ONG)
    findOne(@Param('id') id: string) {
        return this.receiptsService.findOne(id);
    }

    @Get()
    @Roles(Role.TUTOR, Role.ONG)
    findAll() {        
        return this.receiptsService.findAll();
    }
  
    @Post()
    @Roles(Role.TUTOR, Role.ONG)
    create(@GetCurrentUserId() userId: string, @Body() createReceiptDto: CreateReceiptDto) {
        return this.receiptsService.create(userId, createReceiptDto);
    }
  
    @Patch(':id')
    @Roles(Role.TUTOR, Role.ONG)
    update(@Param('id') id: string, @Body() updateReceiptDto: UpdateReceiptDto) {
        return this.receiptsService.update(id, updateReceiptDto);
    }
  
    @Delete(':id')
    @Roles(Role.TUTOR, Role.ONG)
    remove(@Param('id') id: string) {
         return this.receiptsService.remove(id);
    }
}
