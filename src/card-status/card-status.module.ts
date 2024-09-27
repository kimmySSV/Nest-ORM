import { Module } from '@nestjs/common';
import { CardStatusService } from './card-status.service';
import { CardStatusController } from './card-status.controller';
import { CardStatusEntity } from './entities/card-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CardStatusEntity])],
  controllers: [CardStatusController],
  providers: [CardStatusService],
})
export class CardStatusModule {}
