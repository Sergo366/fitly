import 'multer';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClothesService } from './clothes.service';
import { CreateClothingDto } from './dtos/create-clothing.dto';
import { UpdateClothingDto } from './dtos/update-clothing.dto';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';
import { AiService } from '../ai/ai.service';

@Controller('clothes')
export class ClothesController {
  constructor(
    private readonly clothesService: ClothesService,
    private readonly aiService: AiService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @GetCurrentUserId() userId: string,
    @Body() createClothingDto: CreateClothingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.clothesService.create(userId, createClothingDto, file);
  }

  @Get()
  findAll(@GetCurrentUserId() userId: string) {
    return this.clothesService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @GetCurrentUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.clothesService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @GetCurrentUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClothingDto: UpdateClothingDto,
  ) {
    return this.clothesService.update(userId, id, updateClothingDto);
  }

  @Delete(':id')
  remove(
    @GetCurrentUserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.clothesService.remove(userId, id);
  }
}
