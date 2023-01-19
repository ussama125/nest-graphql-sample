import { Price } from './price.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceResolver } from './price.resolver';
import { ProductModule } from 'src/modules/product/product.module';
import { PubsubModule } from '../pubsub/pubsub.module';


@Module({
  imports: [TypeOrmModule.forFeature([Price]), forwardRef(()=> ProductModule), PubsubModule],
  providers: [
    PriceService,
    PriceResolver
  ],
  exports: [PriceService]
})
export class PriceModule {}