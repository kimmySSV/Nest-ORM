import { Body, Injectable } from '@nestjs/common';
import { CreateCardStatusDto } from './dto/create-card-status.dto';
import { UpdateCardStatusDto } from './dto/update-card-status.dto';
import { cardStatusDto } from './dto/card-status.dto';
import { CardStatusEntity } from './entities/card-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CardStatusService {
  constructor(
    @InjectRepository(CardStatusEntity)
    private readonly cardStatusRepository: Repository<CardStatusEntity>,
  ) {}

  create(createCardStatusDto: CreateCardStatusDto) {
    return 'This action adds a new cardStatus';
  }

  // PROD Services
  async updateCardService(@Body() bodyReq: cardStatusDto): Promise<any> {
    const { cardNo, statusUpdate } = bodyReq;
    const sql = `SELECT CARD_NO, CARD_CUST_ID, CARD_CRDACCT_NO, CARD_EMBOSSED_NAME, CARD_PLASTIC_CODE FROM ONECARD.CZ_CARD@ONECARD_LINK_DC WHERE CARD_NO = '${cardNo}' `;
    const card = await this.cardStatusRepository.query(sql);
    if (!card.length) {
      return {
        response: '05',
        data: {
          cardData: card,
          message: "Card Not Found"
        },
      };
    }

    const sqlUpdate = `UPDATE ONECARD.CZ_CARD@ONECARD_LINK_DC SET CARD_PLASTIC_CODE = '${statusUpdate}' WHERE CARD_NO = '${cardNo}' `;
    const cardUpdate = await this.cardStatusRepository.query(sqlUpdate);
    const cardUpdateResult = await this.cardStatusRepository.query(sql);
    //console.log(cardUpdate);
    if(!cardUpdate){
      return {
        response: '05',
        data: {
          cardData: cardUpdateResult,
          message: "Something Went Wrong!!! Card Not Update ATM Card Status"
        },
      };
    }
    return {
      response : "00",
      data: {
        cardData: cardUpdateResult,
        message: "Successful Update ATM Card Status"
      }
    };
  }

  // UAT Services
  async updateCardUatService(@Body() bodyReq: cardStatusDto): Promise<any> {
    const { cardNo, statusUpdate } = bodyReq;
    const sql = `SELECT CARD_NO, CARD_CUST_ID, CARD_CRDACCT_NO, CARD_EMBOSSED_NAME, CARD_PLASTIC_CODE FROM ONECARD.CZ_CARD@ONECARD_UAT WHERE CARD_NO = '${cardNo}' `;
    const card = await this.cardStatusRepository.query(sql);
    if (!card.length) {
      return {
        response: '05',
        data: {
          cardData: card,
          message: "Card Not Found"
        },
      };
    }

    const sqlUpdate = `UPDATE ONECARD.CZ_CARD@ONECARD_UAT SET CARD_PLASTIC_CODE = '${statusUpdate}' WHERE CARD_NO = '${cardNo}' `;
    const cardUpdate = await this.cardStatusRepository.query(sqlUpdate);
    const cardUpdateResult = await this.cardStatusRepository.query(sql);
    //console.log(cardUpdate);
    if(!cardUpdate){
      return {
        response: '05',
        data: {
          cardData: cardUpdateResult,
          message: "Something Went Wrong!!! Card Not Update ATM Card Status"
        },
      };
    }
    return {
      response : "00",
      data: {
        cardData: cardUpdateResult,
        message: "Successful Update ATM Card Status"
      }
    };
  }

  findAll() {
    return `This action returns all cardStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardStatus`;
  }

  update(id: number, updateCardStatusDto: UpdateCardStatusDto) {
    return `This action updates a #${id} cardStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardStatus`;
  }
}
