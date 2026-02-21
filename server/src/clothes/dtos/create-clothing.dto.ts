import { IsString, IsIn } from 'class-validator';
import { CATEGORIES, SEASONS, Season } from '@fitly/shared';

export class CreateClothingDto {
  @IsString()
  title: string;

  @IsString()
  userTitle: string;

  @IsString()
  imageUrl: string;

  @IsString()
  type: string;

  @IsString()
  @IsIn(CATEGORIES)
  category: string;

  @IsString({ each: true })
  @IsIn(SEASONS, { each: true })
  seasons: Season[];

  @IsString()
  ticker: string;
}
