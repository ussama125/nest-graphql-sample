import { PriceService } from './price.service';
import { Price, PriceInput } from './price.model';
import { Resolver, Mutation, Args, Query, Int, Parent, ResolveField, Subscription } from '@nestjs/graphql';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';
import { Product } from 'src/modules/product/product.model';
import { PubSubEngine } from 'graphql-subscriptions';

@Resolver(of => Price)
export class PriceResolver {

  constructor(
    @Inject(ProductService) private productService: ProductService,
    @Inject(PriceService) private priceService: PriceService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine
  ) { }
  
  @Query(returns => Price)
  async getPrice(@Args('id', { type: () => Int }) id: number): Promise<Price> {
    const price: Price = await this.priceService.findOne(id);
    console.log(price);

    if (!price) {
      throw new NotFoundException();
    }

    return price;
  }

  @Query(returns => [Price])
  async getPrices(): Promise<Price[]> {
    return await this.priceService.findAll();
  }

  @ResolveField(returns => Product)
  async product(@Parent() price: Price) {
    const { product } = price;
    return this.productService.findOne(product.id);
  }

  @Mutation(returns => Price)
  async createPrice(
    @Args('price') price: PriceInput
  ): Promise<Price> {
    const product = await this.productService.findBySku(price.sku);
    
    if (!product) {
        throw new NotFoundException('SKU does not exist');
    }

    const newPrice = await this.priceService.create(price, product);
    await this.pubSub.publish('priceAdded', {priceAdded: newPrice});
    return newPrice;
  }

}