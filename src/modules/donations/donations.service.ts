import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Donation } from './entities/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { TutorsService } from '../tutors/tutors.service';

@Injectable()
export class DonationsService {
  @Inject('DONATIONS_REPOSITORY')
  private donationRepository: Repository<Donation>;

  constructor(private readonly tutorsService: TutorsService) {}

  async findAll() {
    return this.donationRepository.find();
  }

  async findOne(id: string) {
    const donation = await this.donationRepository.findOne({
      where: { id }
    });
    if (!donation) {
      throw new NotFoundException(`Donation ID ${id} not found`);
    }
    return donation;
  }

  async findOneBytutorId(id: string) {
    const donation = await this.donationRepository.findOne({
      where: { tutorId: id }
    });
    if (!donation) {
      throw new NotFoundException(`Donation ID ${id} not found`);
    }
    return donation;
  }

  async create(userId: string, createDonationDto: CreateDonationDto) {
    try {
      const tutor = await this.tutorsService.findOne(userId);
      createDonationDto.tutorId = tutor.id;
      const donation = this.donationRepository.create(createDonationDto);
      return this.donationRepository.save(donation);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateDonationDto: UpdateDonationDto) {
    updateDonationDto.updated_at = new Date();
    const donation = await this.donationRepository.preload({
      id,
      ...updateDonationDto
    });
    if (!donation) {
      throw new NotFoundException(`Donation ID ${id} not found`);
    }
    return this.donationRepository.save(donation);
  }

  async remove(id: string) {
    const donation = await this.donationRepository.findOne({
      where: { id },
    });
    if (!donation) {
      throw new NotFoundException(`Donation ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadDonation = await this.donationRepository.preload({
      id,
      deleted_at: date
    });
    return this.donationRepository.save(preloadDonation)
  }
}
