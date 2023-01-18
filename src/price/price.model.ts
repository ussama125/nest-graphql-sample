import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Product } from 'src/product/product.model';

@ObjectType()
@Entity('price')
export class Price {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @ManyToOne(type => Product, product => product.prices)
  @JoinColumn({name: 'sku', referencedColumnName: 'sku'})
  product: Product;

  @Field()
  @Column('numeric', {precision: 7, scale: 2})
  cost: number;

  @Field()
  @Column('numeric', {precision: 7, scale: 2})
  base: number;

  @Field()
  @Column('numeric', {precision: 7, scale: 2, nullable: true})
  sale: number;

  @Field()
  @Column({name: 'created_at'})
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({name: 'updated_at'})
  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class PriceInput {

  @Field()
  sku: string;

  @Field()
  cost: number;

  @Field()
  base: number;
}