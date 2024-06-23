import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Receipt } from './entities/receipt.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { TutorsService } from '../tutors/tutors.service';

@Injectable()
export class ReceiptsService {
  @Inject('RECEIPTS_REPOSITORY')
  private receiptRepository: Repository<Receipt>;

  constructor(private readonly tutorsService: TutorsService) {}

  async findAll() {
    return this.receiptRepository.find();
  }

  async findOne(id: string) {
    const receipt = await this.receiptRepository.findOne({
      where: { id }
    });
    if (!receipt) {
      throw new NotFoundException(`Receipt ID ${id} not found`);
    }
    return receipt;
  }

  // async findOneBytutorId(id: string) {
  //   const receipt = await this.receiptRepository.findOne({
  //     where: { tutorId: id }
  //   });
  //   if (!receipt) {
  //     throw new NotFoundException(`Receipt ID ${id} not found`);
  //   }
  //   return receipt;
  // }

  async create(userId: string, createReceiptDto: CreateReceiptDto) {
    // try {
    //   const tutor = await this.tutorsService.findOne(userId);
    //   createReceiptDto.tutorId = tutor.id;
      const receipt = this.receiptRepository.create(createReceiptDto);
      return this.receiptRepository.save(receipt);
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  async update(id: string, updateReceiptDto: UpdateReceiptDto) {
    updateReceiptDto.updated_at = new Date();
    const receipt = await this.receiptRepository.preload({
      id,
      ...updateReceiptDto
    });
    if (!receipt) {
      throw new NotFoundException(`Receipt ID ${id} not found`);
    }
    return this.receiptRepository.save(receipt);
  }

  async remove(id: string) {
    const receipt = await this.receiptRepository.findOne({
      where: { id },
    });
    if (!receipt) {
      throw new NotFoundException(`Receipt ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadreceipt = await this.receiptRepository.preload({
      id,
      deleted_at: date
    });
    return this.receiptRepository.save(preloadreceipt)
  }
}
