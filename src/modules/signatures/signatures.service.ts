import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Signature } from './entities/signature.entity';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';

@Injectable()
export class SignaturesService {
  @Inject('SIGNATURES_REPOSITORY')
  private signatureRepository: Repository<Signature>;

  async findAll() {
    return this.signatureRepository.find();
  }

  async findOne(id: string) {
    const signature = await this.signatureRepository.findOne({
      where: { id }
    });
    if (!signature) {
      throw new NotFoundException(`Signature ID ${id} not found`);
    }
    return signature;
  }

  async create(createSignatureDto: CreateSignatureDto) {
    try {
      const signature = this.signatureRepository.create(createSignatureDto);
      return this.signatureRepository.save(signature);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateSignatureDto: UpdateSignatureDto) {
    updateSignatureDto.updated_at = new Date();
    const signature = await this.signatureRepository.preload({
      id,
      ...updateSignatureDto
    });
    if (!signature) {
      throw new NotFoundException(`Signature ID ${id} not found`);
    }
    return this.signatureRepository.save(signature);
  }

  async remove(id: string) {
    const signature = await this.signatureRepository.findOne({
      where: { id },
    });
    if (!signature) {
      throw new NotFoundException(`Signature ID ${id} not found`);
    }
  
    const date = new Date();
    const preloadSignature = await this.signatureRepository.preload({
      id,
      deleted_at: date
    });
    return this.signatureRepository.save(preloadSignature)
  }
}
