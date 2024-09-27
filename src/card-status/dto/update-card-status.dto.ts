import { PartialType } from '@nestjs/mapped-types';
import { CreateCardStatusDto } from './create-card-status.dto';

export class UpdateCardStatusDto extends PartialType(CreateCardStatusDto) {}
