import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { Clothing } from './clothing.entity';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Clothing]), AiModule],
  controllers: [ClothesController],
  providers: [ClothesService],
  exports: [ClothesService],
})
export class ClothesModule {}
