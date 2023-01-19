import { Injectable } from '@nestjs/common';
import { Price, PriceInput } from './price.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/modules/product/product.model';

@Injectable()
export class PriceService {
    constructor(
        @InjectRepository(Price)
        private priceRepository: Repository<Price>,
      ) {}

      create(details: PriceInput, product: Product): Promise<Price> {
          return this.priceRepository.save({product, ...details});
      }
    
      findAll(): Promise<Price[]> {
        return this.priceRepository.find({relations: {product: true}});
      }
    
      findOne(id: number): Promise<Price> {
        return this.priceRepository.findOne({where: {id}, relations: {product: true}});
      }
    
      findBySku(sku: string): Promise<Price[]> {
        return this.priceRepository.createQueryBuilder("price")
        .where("price.product = :sku", { sku })
        .getMany();
      }
}