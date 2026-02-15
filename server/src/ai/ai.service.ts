import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
    if (!apiKey) {
      console.warn('GOOGLE_API_KEY is not defined in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey || 'dummy_key');
  }

  async getClothingTicker(buffer: Buffer, mimeType: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });

      const base64Image = buffer.toString('base64');

      const prompt =
        "Identify this clothing item and provide a short, unique ticker symbol for it (e.g., 'WHT-TSHIRT', 'BLU-JEANS'). Return ONLY the ticker symbol.";

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
      ]);

      const response = result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException(
        'Failed to analyze image with Gemini',
      );
    }
  }
}
