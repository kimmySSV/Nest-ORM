import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity({ schema:"ATMBK" })
//@Entity({ schema:"ONECARD", name: 'CZ_AUTHTXN@ONECARD_LINK', })
export class TransactiontEntity {
  // @PrimaryColumn({ name: 'ID' })
  // ID: string;

  // @Column({ name: 'TXN_DATE' })
  // TXN_DATE: string;

  // @Column({ name: 'CHANNEL' })
  // CHANNEL: string;

  // @Column({ name: 'REF_NO' })
  // REF_NO: string;

  // @Column({ name: 'FROM_BANK' })
  // FROM_BANK: string;

  // @Column({ name: 'TO_BANK' })
  // TO_BANK: string;

  // @Column({ name: 'FROM_ACCOUNT' })
  // FROM_ACCOUNT: string;

  // @Column({ name: 'FROM_ACCOUNT_NAME' })
  // FROM_ACCOUNT_NAME: string;

  // @Column({ name: 'FROM_COCODE' })
  // FROM_COCODE: string;

  // @Column({ name: 'TO_ACCOUNT' })
  // TO_ACCOUNT: string;

  // @Column({ name: 'TO_ACCOUNT_NAME' })
  // TO_ACCOUNT_NAME: string;

  // @Column({ name: 'TO_COCODE' })
  // TO_COCODE: string;

  // @Column({ name: 'FEE_AMOUNT' })
  // FEE_AMOUNT: string;

  // @Column({ name: 'TXN_AMOUNT' })
  // TXN_AMOUNT: string;

  // ----------------------------------------------------------

  @PrimaryColumn({ name: 'AUTHTXN_NO' })
  AUTHTXN_NO: string;

  @Column({ name: 'AUTHTXN_REQUEST_DATE' })
  AUTHTXN_REQUEST_DATE: string;

  @Column({ name: 'AUTHTXN_REQUEST_TIME' })
  AUTHTXN_REQUEST_TIME: string;

  @Column({ name: 'AUTHTXN_TXNTYPE_ID' })
  AUTHTXN_TXNTYPE_ID: string;

  @Column({ name: 'AUTHTXN_RETRIEVAL_REFNO' })
  AUTHTXN_RETRIEVAL_REFNO: string;

  @Column({ name: 'AUTHTXN_APPROVAL_CODE' })
  AUTHTXN_APPROVAL_CODE: string;

  @Column({ name: 'AUTHTXN_CUST_ID' })
  AUTHTXN_CUST_ID: string;
  
  @Column({ name: 'AUTHTXN_CARD_NO' })
  AUTHTXN_CARD_NO: string;
  
  @Column({ name: 'AUTHTXN_CARDHOLDER_NAME' })
  AUTHTXN_CARDHOLDER_NAME: string;
  
  @Column({ name: 'AUTHTXN_CRDACCT_NO' })
  AUTHTXN_CRDACCT_NO: string;

  @Column({ name: 'AUTHTXN_CARD_NO_TO' })
  AUTHTXN_CARD_NO_TO: string;

  @Column({ name: 'AUTHTXN_CRDACCT_NO_TO' })
  AUTHTXN_CRDACCT_NO_TO: string;

  @Column({ name: 'AUTHTXN_COUNTRY_CODE' })
  AUTHTXN_COUNTRY_CODE: string;
  
  @Column({ name: 'AUTHTXN_TERMINAL_ID' })
  AUTHTXN_TERMINAL_ID: string;

  @Column({ name: 'AUTHTXN_MERCHANT_ID' })
  AUTHTXN_MERCHANT_ID: string;

  @Column({ name: 'AUTHTXN_MERCHANT_NAME' })
  AUTHTXN_MERCHANT_NAME: string;

  @Column({ name: 'AUTHTXN_CURRENCY_CODE' })
  AUTHTXN_CURRENCY_CODE: string;

  @Column({ name: 'AUTHTXN_TXN_ENTRY_MODE' })
  AUTHTXN_TXN_ENTRY_MODE: string;

  // @Column({ name: 'AUTHTXN_FRAUD_RULES' })
  // AUTHTXN_FRAUD_RULES: string;

  @Column({ name: 'AUTHTXN_CRDPLAN_ID' })
  AUTHTXN_CRDPLAN_ID: string;

  @Column({ name: 'AUTHTXN_PRIVATE_FIELD_57' })
  AUTHTXN_PRIVATE_FIELD_57: string;

  @Column({ name: 'AUTHTXN_PRIVATE_FIELD_58' })
  AUTHTXN_PRIVATE_FIELD_58: string;

  @Column({ name: 'AUTHTXN_SOURCE' })
  AUTHTXN_SOURCE: string;

  @Column({ name: 'AUTHTXN_DEST' })
  AUTHTXN_DEST: string;

  @Column({ name: 'AUTHTXN_REQUEST_AMT' })
  AUTHTXN_REQUEST_AMT: string;

  @Column({ name: 'AUTHTXN_APPROVED_AMT' })
  AUTHTXN_APPROVED_AMT: string;

  @Column({ name: 'AUTHTXN_FEE' })
  AUTHTXN_FEE: string;

  @Column({ name: 'AUTHTXN_FOREX_MARKUP_AMT' })
  AUTHTXN_FOREX_MARKUP_AMT: string;

  @Column({ name: 'AUTHTXN_NET_AMT' })
  AUTHTXN_NET_AMT: string;

  @Column({ name: 'AUTHTXN_RESPONSE_CODE' })
  AUTHTXN_RESPONSE_CODE: string;


}

