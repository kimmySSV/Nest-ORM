import { Module } from '@nestjs/common';
import { CardPinService } from './card-pin.service';
import { CardPinController } from './card-pin.controller';
import { CardPinEntity } from './entities/card-pin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CardPinEntity])],
  controllers: [CardPinController],
  providers: [CardPinService],
})
export class CardPinModule {}
