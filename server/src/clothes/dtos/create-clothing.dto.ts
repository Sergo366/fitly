import { IsString } from 'class-validator';

export class CreateClothingDto {
  @IsString()
  title: string;

  @IsString()
  imageUrl: string;

  @IsString()
  type: string;

  @IsString()
  category: string;

  @IsString({ each: true })
  seasons: string[];

  @IsString()
  ticker: string;
}
