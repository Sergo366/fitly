import 'multer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clothing } from './clothing.entity';
import { CreateClothingDto } from './dtos/create-clothing.dto';
import { UpdateClothingDto } from './dtos/update-clothing.dto';
import { AiService } from '../ai/ai.service';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(Clothing)
    private readonly clothesRepository: Repository<Clothing>,
    private readonly aiService: AiService,
  ) {}

  async create(
    userId: string,
    dto: CreateClothingDto,
    file?: Express.Multer.File,
  ): Promise<any> {
    let ticker = undefined;

    if (file) {
      ticker = await this.aiService.getClothingTicker(
        file.buffer,
        file.mimetype,
      );
    }

    // const clothing = this.clothesRepository.create({
    //   ...dto,
    //   userId,
    //   ticker,
    // });
    return ticker;
  }

  async findAll(userId: string): Promise<Clothing[]> {
    return this.clothesRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(userId: string, id: string): Promise<Clothing> {
    const clothing = await this.clothesRepository.findOne({
      where: { id, userId },
    });

    if (!clothing) {
      throw new NotFoundException(`Clothing with ID ${id} not found`);
    }

    return clothing;
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateClothingDto,
  ): Promise<Clothing> {
    const clothing = await this.findOne(userId, id);
    const updated = this.clothesRepository.merge(clothing, dto);
    return this.clothesRepository.save(updated);
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.clothesRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Clothing with ID ${id} not found`);
    }
  }
}
