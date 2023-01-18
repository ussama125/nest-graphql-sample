import { Product } from './product.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PriceModule } from 'src/price/price.module';


@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => PriceModule)],
  providers: [ProductService, ProductResolver],
  exports: [ProductService]
})
export class ProductModule {}