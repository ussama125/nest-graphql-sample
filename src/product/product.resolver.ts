import { ProductService } from './product.service';
import { Product, ProductInput } from './product.model';
import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { Inject, NotFoundException } from '@nestjs/common';

@Resolver(of => Product)
export class ProductResolver {

  constructor(
    @Inject(ProductService) private productService: ProductService
  ) { }
  
  @Query(returns => Product)
  async getProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    const product: Product = await this.productService.findOne(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

//   @ResolveField(returns => [InvoiceModel])
//   async invoices(@Parent() Product) {
//     const { id } = Product;
//     console.log(Product);
//     return this.invoiceService.findByProduct(id);
//   }

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
}