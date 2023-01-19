import { Product } from './product.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PriceModule } from 'src/modules/price/price.module';
import { PubsubModule } from '../pubsub/pubsub.module';


@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => PriceModule), PubsubModule],
  providers: [
    ProductService,
    ProductResolver
  ],
  exports: [ProductService]
})
export class ProductModule {}