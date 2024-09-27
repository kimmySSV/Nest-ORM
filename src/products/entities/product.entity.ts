import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity({ name: 'PRODUCTS' })
export class ProductEntity {
  @PrimaryColumn({ name: 'PRODUCT_ID' })
  productId: number;

  @Column({ name: 'PRODUCT_NAME' })
  productName: string;

  @Column({ name: 'DESCRIPTION' })
  productDesc: string;

  @Column({ name: 'STANDARD_COST' })
  standardCost: number;

  @Column({ name: 'LIST_PRICE' })
  listPrice: number;

  @Column({ name: 'CATEGORY_ID' })
  categoryId: number;
}
