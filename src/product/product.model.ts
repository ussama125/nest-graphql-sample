import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
@Entity('product')
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({ length: 50, nullable: false })
  sku: string;

  @Field()
  @Column('varchar')
  image: string;

  @Field()
  @Column({name: 'is_active'})
  isActive: boolean;

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
export class ProductInput {

  @Field()
  sku: string;

  @Field()
  image: string;

  @Field()
  isActive: boolean;
}