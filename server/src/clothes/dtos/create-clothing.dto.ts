import { IsString, IsIn } from 'class-validator';
import { CATEGORIES, SEASONS } from '@fitly/shared';

export class CreateClothingDto {
  @IsString()
  title: string;

  @IsString()
  imageUrl: string;

  @IsString()
  type: string;

  @IsString()
  @IsIn(CATEGORIES)
  category: string;

  @IsString({ each: true })
  @IsIn(SEASONS, { each: true })
  seasons: string[];

  @IsString()
  ticker: string;
}
