import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreditCard } from './entities/creditCard.entity';
import { CreateCreditCardDto } from './dto/create-creditCard.dto';
import { UpdateCreditCardDto } from './dto/update-creditCard.dto';
import { TutorsService } from '../tutors/tutors.service';

@Injectable()
export class CreditCardsService {
  @Inject('CREDITCARDS_REPOSITORY')
  private creditCardRepository: Repository<CreditCard>;

  constructor(private readonly tutorsService: TutorsService) {}

  async findAll() {
    return this.creditCardRepository.find();
  }

  async findOne(id: string) {
    const creditCard = await this.creditCardRepository.findOne({
      where: { id }
    });
    if (!creditCard) {
      throw new NotFoundException(`CreditCard ID ${id} not found`);
    }
    return creditCard;
  }

  async findOneBytutorId(id: string) {
    const creditCard = await this.creditCardRepository.findOne({
      where: { tutorId: id }
    });
    if (!creditCard) {
      throw new NotFoundException(`CreditCard ID ${id} not found`);
    }
    return creditCard;
  }

  async create(userId: string, createCreditCardDto: CreateCreditCardDto) {
    const tutor = await this.tutorsService.findOne(userId);
    createCreditCardDto.tutorId = tutor.id;
    if (
      createCreditCardDto.creditCardId === 'Credito' ||
      createCreditCardDto.creditCardId === 'Debito') {
        const creditCard = this.creditCardRepository.create(createCreditCardDto);
        return this.creditCardRepository.save(creditCard);
    }
    throw new Error('tipo do cartao deve ser credito ou debito!')
  }

  async update(id: string, updateCreditCardDto: UpdateCreditCardDto) {
    updateCreditCardDto.updated_at = new Date();
    const creditCard = await this.creditCardRepository.preload({
      id,
      ...updateCreditCardDto
    });
    if (!creditCard) {
      throw new NotFoundException(`CreditCard ID ${id} not found`);
    }
    return this.creditCardRepository.save(creditCard);
  }

  async remove(id: string) {
    const creditCard = await this.creditCardRepository.findOne({
      where: { id },
    });
    if (!creditCard) {
      throw new NotFoundException(`CreditCard ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadCreditCard = await this.creditCardRepository.preload({
      id,
      deleted_at: date
    });
    return this.creditCardRepository.save(preloadCreditCard)
  }
}
