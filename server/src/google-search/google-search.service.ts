import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SerperImageResult,
  SerperSearchResponse,
} from './interfaces/search-response.interface';

@Injectable()
export class GoogleSearchService {
  private readonly logger = new Logger(GoogleSearchService.name);
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('SERPER_API_KEY') || '';
    if (!this.apiKey) {
      this.logger.warn(
        'SERPER_API_KEY is not defined in environment variables',
      );
    }
  }

  async findImages(query: string): Promise<SerperImageResult[]> {
    if (!this.apiKey) {
      this.logger.error('Cannot search: SERPER_API_KEY is missing');
      return [];
    }

    try {
      this.logger.log(`Searching images for: ${query}`);

      const response = await fetch('https://google.serper.dev/images', {
        method: 'POST',
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: query,
          num: 20,
        }),
      });

      if (!response.ok) {
        throw new Error(`Serper API error: ${response.statusText}`);
      }

      const data = (await response.json()) as SerperSearchResponse;
      return data.images || [];
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to search images: ${errorMessage}`);
      return [];
    }
  }
}
