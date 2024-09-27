import { PartialType } from '@nestjs/mapped-types';
import { CreateCardPinDto } from './create-card-pin.dto';

export class UpdateCardPinDto extends PartialType(CreateCardPinDto) {}
