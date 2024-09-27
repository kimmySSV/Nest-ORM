import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity({ schema: 'ATMBK' })
export class CardPinEntity {
    @PrimaryColumn({ name: 'CRDPIN_CARD_NO' })
    CARD_NO: string;
  
    @Column({ name: 'CRDPIN_PINTYPE_ID' })
    PIN_TYPE: string;
  
    @Column({ name: 'CRDPIN_TRY_COUNT' })
    PIN_COUNT: string;
  
}
