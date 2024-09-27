import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { CardStatusService } from './card-status.service';
import { CreateCardStatusDto } from './dto/create-card-status.dto';
import { UpdateCardStatusDto } from './dto/update-card-status.dto';
import { cardStatusDto } from './dto/card-status.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('api-key'))
@Controller({
  version: '1',
  path: 'card-status'
})
export class CardStatusController {
  constructor(private readonly cardStatusService: CardStatusService) {}

  @Post()
  create(@Body() createCardStatusDto: CreateCardStatusDto) {
    return this.cardStatusService.create(createCardStatusDto);
  }

  @HttpCode(200)
  @Post('prod-update')
  async updateCard(@Body() bodyReq: cardStatusDto){
    const resultUpdate = await this.cardStatusService.updateCardService(bodyReq);
    return resultUpdate;
  }

  @HttpCode(200)
  @Post('uat-update')
  async updateCardUat(@Body() bodyReq: cardStatusDto){
    const resultUpdate = await this.cardStatusService.updateCardService(bodyReq);
    return resultUpdate;
  }

  @Get()
  findAll() {
    return this.cardStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardStatusDto: UpdateCardStatusDto) {
    return this.cardStatusService.update(+id, updateCardStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardStatusService.remove(+id);
  }
}
