import { ProductService } from './product.service';
import { Product, ProductInput } from './product.model';
import { Resolver, Mutation, Args, Query, Int, ResolveField, Parent, Subscription, Context } from '@nestjs/graphql';
import { Inject, NotFoundException } from '@nestjs/common';
import { Price } from 'src/modules/price/price.model';
import { PriceService } from 'src/modules/price/price.service';
import { PubSubEngine } from 'graphql-subscriptions';

@Resolver(of => Product)
export class ProductResolver {

  constructor(
    @Inject(ProductService) private productService: ProductService,
    @Inject(PriceService) private priceService: PriceService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine
  ) { }
  
  @Query(returns => Product)
  async getProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    const product: Product = await this.productService.findOne(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @ResolveField(returns => [Price])
  async prices(@Parent() product: Product) {
    const { sku } = product;
    return this.priceService.findBySku(sku);
  }

  @Query(returns => [Product])
  async getProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Mutation(returns => Product)
  async createProduct(
    @Args('product') product: ProductInput
  ): Promise<Product> {
    return await this.productService.create(product);
  }

  @Subscription((returns) => Price)
  priceAdded() {
    console.log('*********here');
    return this.pubSub.asyncIterator('priceAdded');
  }

}