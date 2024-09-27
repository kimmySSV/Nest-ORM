import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { TransactiontEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(TransactiontEntity)
    private readonly transactionRepository: Repository<TransactiontEntity>,
  ) {}
  
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  async findAll(): Promise<any> {
    const sql = `SELECT AUTHTXN_NO, AUTHTXN_REQUEST_DATE, AUTHTXN_REQUEST_TIME, AUTHTXN_TXNTYPE_ID, AUTHTXN_RETRIEVAL_REFNO, AUTHTXN_APPROVAL_CODE, AUTHTXN_CUST_ID, AUTHTXN_CARD_NO,
                 AUTHTXN_CARDHOLDER_NAME, AUTHTXN_CRDACCT_NO, AUTHTXN_CARD_NO_TO, AUTHTXN_CRDACCT_NO_TO, AUTHTXN_COUNTRY_CODE, AUTHTXN_TERMINAL_ID, AUTHTXN_MERCHANT_ID, 
                 AUTHTXN_MERCHANT_NAME, AUTHTXN_CURRENCY_CODE, AUTHTXN_TXN_ENTRY_MODE, AUTHTXN_CRDPLAN_ID, AUTHTXN_PRIVATE_FIELD_57, AUTHTXN_PRIVATE_FIELD_58, AUTHTXN_SOURCE, 
                 AUTHTXN_DEST, AUTHTXN_REQUEST_AMT, AUTHTXN_APPROVED_AMT, AUTHTXN_FEE, AUTHTXN_FOREX_MARKUP_AMT, AUTHTXN_NET_AMT, AUTHTXN_RESPONSE_CODE FROM ONECARD.CZ_AUTHTXN@ONECARD_LINK 
                 WHERE AUTHTXN_RETRIEVAL_REFNO = '423807069188' `;
    return await this.transactionRepository.query(sql);

    // const txn = await this.transactionRepository.find({
    //   where: {
    //     AUTHTXN_RETRIEVAL_REFNO: '412914043564',
    //   },
    // });

    // if(!txn){
    //   throw new HttpException('No record found', HttpStatus.NOT_FOUND);
    // }
    
    // return txn;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
