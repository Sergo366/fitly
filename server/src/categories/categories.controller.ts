import { Controller, Get, Delete, Body } from '@nestjs/common';
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

  @Delete()
  async deleteCategory(
    @GetCurrentUserId() userId: string,
    @Body() body: { categoryId: string },
  ): Promise<UserCategory[]> {
    return this.categoriesService.removeUserCategory(userId, body.categoryId);
  }
}
