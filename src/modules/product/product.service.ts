import { Injectable } from '@nestjs/common';
import { Product, ProductInput } from './product.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
      ) {}

      create(details: ProductInput): Promise<Product> {
          return this.productRepository.save(details);
      }
    
      findAll(): Promise<Product[]> {
        return this.productRepository.find();
      }
    
      findOne(id: number): Promise<Product> {
        return this.productRepository.findOne({where: {id}, relations: {prices: true}});
      }
    
      findBySku(sku: string): Promise<Product> {
        return this.productRepository.findOne({where: {sku}});
      }
}