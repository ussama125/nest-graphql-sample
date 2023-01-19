import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceModule } from './modules/price/price.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true
      },
      formatError: (error: any) => {
        const graphQLFormattedError = {
          message: error.extensions?.exception?.response?.message || error.message,
          code: error.extensions?.code || "SERVER_ERROR",
          name: error.extensions?.exception?.name || error.name,
        };
        return graphQLFormattedError;
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 49154,
      username: 'postgres',
      password: 'postgrespw',
      database: 'ecom',
      entities: ['dist/**/*.model.js'],
      synchronize: true
    }),
    ProductModule,
    PriceModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}
