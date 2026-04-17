import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { UserCategory } from './user-category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@GetCurrentUserId() userId: string): Promise<UserCategory[]> {
    return this.categoriesService.findAllByUser(userId);
  }
}
