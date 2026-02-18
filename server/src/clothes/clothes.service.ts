import 'multer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clothing } from './clothing.entity';
import { UpdateClothingDto } from './dtos/update-clothing.dto';
import { AiService } from '../ai/ai.service';
import { GoogleSearchService } from '../google-search/google-search.service';
import { SerperImageResult } from 'src/google-search/interfaces/search-response.interface';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(Clothing)
    private readonly clothesRepository: Repository<Clothing>,
    private readonly aiService: AiService,
    private readonly searchService: GoogleSearchService,
  ) {}

  async getClothesFromImage(
    file?: Express.Multer.File,
  ): Promise<{ ticker: string; searchResults: SerperImageResult[] }> {
    let ticker = '';

    if (file) {
      ticker = await this.aiService.getClothingTicker(
        file.buffer,
        file.mimetype,
      );
    }

    let searchResults: SerperImageResult[] = [];
    if (ticker) {
      searchResults = await this.searchService.findImages(ticker);
    }

    return {
      ticker,
      searchResults,
    };
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
