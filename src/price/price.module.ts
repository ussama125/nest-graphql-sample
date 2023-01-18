import { Price } from './price.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceResolver } from './price.resolver';
import { ProductModule } from 'src/product/product.module';


@Module({
  imports: [TypeOrmModule.forFeature([Price]), forwardRef(()=> ProductModule)],
  providers: [PriceService, PriceResolver],
  exports: [PriceService]
})
export class PriceModule {}