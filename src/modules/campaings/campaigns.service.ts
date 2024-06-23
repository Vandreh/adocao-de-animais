import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ONGsService } from '../ongs/ongs.service';

@Injectable()
export class CampaignsService {
  @Inject('CAMPAIGNS_REPOSITORY')
  private campaignRepository: Repository<Campaign>;
  constructor (private readonly ongsService: ONGsService) {}

  
  async findAll() {
    return this.campaignRepository.find();
  }

  async findOne(id: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { id }
    });
    if (!campaign) {
      throw new NotFoundException(`Campaign ID ${id} not found`);
    }
    return campaign;
  }

  async findOneByONGId(id: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { ongId: id }
    });
    if (!campaign) {
      throw new NotFoundException(`Campaign ID ${id} not found`);
    }
    return campaign;
  }

  async create(id: string, createCampaignDto: CreateCampaignDto) {
    try {
      const ong = await this.ongsService.findOne(id);
      if (!ong) {
        throw new NotFoundException(`ONG ID ${id} not found`);
      }
      createCampaignDto.ongId = ong.id;
      const campaign = this.campaignRepository.create(createCampaignDto);
      return this.campaignRepository.save(campaign);
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    updateCampaignDto.updated_at = new Date();
    const campaign = await this.campaignRepository.preload({
      id,
      ...updateCampaignDto
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign ID ${id} not found`);
    }

    return this.campaignRepository.save(campaign);
  }

  async remove(id: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
    });
  
    if (!campaign) {
      throw new NotFoundException(`Campaign ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadcampaign = await this.campaignRepository.preload({
      id,
      deleted_at: date
    });

    return this.campaignRepository.save(preloadcampaign)
  }

  async uploadPicture(id: string, title: string): Promise<Campaign> {
    const updated_at = new Date();
    const preloadcampaign = await this.campaignRepository.preload({
      id,
      picture: title,
      updated_at
    });

    if (!preloadcampaign) {
      throw new NotFoundException(`Campaign ID ${id} not found`);
    }

    return this.campaignRepository.save(preloadcampaign);
  }
}
