import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity({ schema: 'ATMBK' })
export class CardStatusEntity {
  @PrimaryColumn({ name: 'CARD_NO' })
  CARD_NO: string;

  @Column({ name: 'CARD_CUST_ID' })
  CARD_CUST_ID: string;

  @Column({ name: 'CARD_CRDACCT_NO' })
  CARD_CRDACCT_NO: string;

  @Column({ name: 'CARD_EMBOSSED_NAME' })
  CARD_EMBOSSED_NAME: string;

  @Column({ name: 'CARD_PLASTIC_CODE' })
  CARD_PLASTIC_CODE: string;
}
