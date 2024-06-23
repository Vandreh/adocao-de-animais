import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BankAccount } from './entities/bankAccount.entity';
import { CreateBankAccountDto } from './dto/create-bankAccount.dto';
import { UpdateBankAccountDto } from './dto/update-bankAccount.dto';
import { ONGsService } from '../ongs/ongs.service';

@Injectable()
export class BankAccountsService {
  @Inject('BANKACCOUNTS_REPOSITORY')
  private bankAccountRepository: Repository<BankAccount>;

  constructor(private readonly ongsService: ONGsService) {}

  async findAll() {
    return this.bankAccountRepository.find();
  }

  async findOne(id: string) {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { id }
    });
    if (!bankAccount) {
      throw new NotFoundException(`Bank Account ID ${id} not found`);
    }
    return bankAccount;
  }

  async findOneByONGId(id: string) {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { ongId: id }
    });
    if (!bankAccount) {
      throw new NotFoundException(`Bank Account ID ${id} not found`);
    }
    return bankAccount;
  }

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const ong = await this.ongsService.findOne(userId);
    createBankAccountDto.ongId = ong.id;
    const bankAccount = this.bankAccountRepository.create(createBankAccountDto);
    return this.bankAccountRepository.save(bankAccount);
  }

  async update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    updateBankAccountDto.updated_at = new Date();
    const bankAccount = await this.bankAccountRepository.preload({
      id,
      ...updateBankAccountDto
    });
    if (!bankAccount) {
      throw new NotFoundException(`Bank Account ID ${id} not found`);
    }
    return this.bankAccountRepository.save(bankAccount);
  }

  async remove(id: string) {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { id },
    });
    if (!bankAccount) {
      throw new NotFoundException(`Bank Account ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadbankAccount = await this.bankAccountRepository.preload({
      id,
      deleted_at: date
    });
    return this.bankAccountRepository.save(preloadbankAccount)
  }
}
