import { Body, Injectable } from '@nestjs/common';
import { CreateCardPinDto } from './dto/create-card-pin.dto';
import { UpdateCardPinDto } from './dto/update-card-pin.dto';
import { cardPinDto } from './dto/card-pin.dto';
import { CardPinEntity } from './entities/card-pin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CardPinService {
  constructor(
    @InjectRepository(CardPinEntity)
    private readonly cardPinRepository: Repository<CardPinEntity>,
  ) {}

  create(createCardPinDto: CreateCardPinDto) {
    return 'This action adds a new cardPin';
  }

  //PROD Services
  async resetCardPinService(@Body() bodyReq: cardPinDto): Promise<any> {
    const { cardNo } = bodyReq;
    // const sql = `SELECT CRDPIN_CARD_NO, CRDPIN_PINTYPE_ID, CRDPIN_TRY_COUNT FROM ONECARD.CZ_CRDPIN@ONECARD_LINK_DC WHERE CRDPIN_PINTYPE_ID = 'CRDPIN' AND CRDPIN_CARD_NO = ${cardNo} `;
    // const card = await this.cardPinRepository.query(sql);
    console.log(bodyReq);
    // if (!card.length) {
    //   return {
    //     response: '05',
    //     data: {
    //       cardData: card,
    //       message: "Card Not Found"
    //     },
    //   };
    // }
    try {
      const sqlReset = `UPDATE ONECARD.CZ_CRDPIN@ONECARD_LINK_DC SET CRDPIN_TRY_COUNT = '0' WHERE CRDPIN_PINTYPE_ID = 'CRDPIN' AND CRDPIN_CARD_NO = '${cardNo}' `;
      const cardUpdate = await this.cardPinRepository.query(sqlReset);
      //const cardResetResult = await this.cardPinRepository.query(sql);
      //console.log(cardUpdate);
      if (!cardUpdate) {
        return {
          response: '05',
          data: {
            cardData: null,
            message:
              'Something Went Wrong!!! Card Not Reset ATM Card Pin Count',
          },
        };
      }
      return {
        response: '00',
        data: {
          cardData: {},
          message: 'Successful Reset ATM Card Pin Count',
        },
      };
    } catch (error) {
      console.log(error);
      
      return {
        response: '05',
        data: {
          //cardData: cardResetResult,
          message: 'Exception Error !!!',
        },
      };
    }
  }

  // UAT Services
  async resetCardPinUATService(@Body() bodyReq: cardPinDto): Promise<any> {
    const { cardNo } = bodyReq;
    const sql = `SELECT CRDPIN_CARD_NO, CRDPIN_PINTYPE_ID, CRDPIN_TRY_COUNT FROM ONECARD.CZ_CRDPIN@ONECARD_UAT WHERE CRDPIN_PINTYPE_ID = 'CRDPIN' AND CRDPIN_CARD_NO = ${cardNo} `;
    const card = await this.cardPinRepository.query(sql);
    console.log(bodyReq);
    if (!card.length) {
      return {
        response: '05',
        data: {
          cardData: null,
          message: 'Card Not Found',
        },
      };
    }

    const sqlReset = `UPDATE ONECARD.CZ_CRDPIN@ONECARD_UAT SET CRDPIN_TRY_COUNT = '0' WHERE CRDPIN_PINTYPE_ID = 'CRDPIN' AND CRDPIN_CARD_NO = '${cardNo}' `;
    const cardUpdate = await this.cardPinRepository.query(sqlReset);
    const cardResetResult = await this.cardPinRepository.query(sql);
    //console.log(cardUpdate);
    if (!cardUpdate) {
      return {
        response: '05',
        data: {
          cardData: null,
          message: 'Something Went Wrong!!! Card Not Reset ATM Card Pin Count',
        },
      };
    }
    return {
      response: '00',
      data: {
        cardData: {},
        message: 'Successful Reset ATM Card Pin Count',
      },
    };
  }

  findAll() {
    return `This action returns all cardPin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardPin`;
  }

  update(id: number, updateCardPinDto: UpdateCardPinDto) {
    return `This action updates a #${id} cardPin`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardPin`;
  }
}
