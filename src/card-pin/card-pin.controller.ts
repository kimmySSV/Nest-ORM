import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { CardPinService } from './card-pin.service';
import { CreateCardPinDto } from './dto/create-card-pin.dto';
import { UpdateCardPinDto } from './dto/update-card-pin.dto';
import { cardPinDto } from './dto/card-pin.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('api-key'))
@Controller({
  version: '1',
  path: 'card-pin'
})
export class CardPinController {
  constructor(private readonly cardPinService: CardPinService) {}

  @Post()
  create(@Body() createCardPinDto: CreateCardPinDto) {
    return this.cardPinService.create(createCardPinDto);
  }

  @HttpCode(200)
  @Post('prod-reset')
  async resetCard(@Body() bodyReq: cardPinDto){
    const resultReset = await this.cardPinService.resetCardPinService(bodyReq);
    return resultReset;
  }

  @HttpCode(200)
  @Post('uat-reset')
  async resetCardUat(@Body() bodyReq: cardPinDto){
    const resultReset = await this.cardPinService.resetCardPinUATService(bodyReq);
    return resultReset;
  }
  


  @Get()
  findAll() {
    return this.cardPinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardPinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardPinDto: UpdateCardPinDto) {
    return this.cardPinService.update(+id, updateCardPinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardPinService.remove(+id);
  }
}
