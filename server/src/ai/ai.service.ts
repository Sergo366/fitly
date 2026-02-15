import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
    if (!apiKey) {
      console.error('GOOGLE_API_KEY is not defined in environment variables');
    } else {
      console.log(
        `GOOGLE_API_KEY loaded successfully (length: ${apiKey.length})`,
      );
    }
    this.genAI = new GoogleGenerativeAI(apiKey || 'dummy_key');
  }

  async getClothingTicker(buffer: Buffer, mimeType: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-001',
      });

      const base64Image = buffer.toString('base64');

      const prompt =
        'Identify this clothing item from the tag. Provide a unique google-search ticker in the format: [Brand]-[ArticleNumber]-[ColorCode]. Use the most specific IDs found on the label (like Index No. or Reference). Return ONLY the ticker symbol.';

      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  data: base64Image,
                  mimeType,
                },
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 40, // Ограничение ускоряет "завершение" ответа
          temperature: 0, // Нулевая температура делает ответ быстрее и точнее
        },
      });

      return result.response.text().trim();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('Gemini API Error details:', {
        error,
      });
      throw new InternalServerErrorException(
        `Failed to analyze image with Gemini: ${errorMessage}`,
      );
    }
  }
}
