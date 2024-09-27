import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static/dist';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './products/entities/product.entity';
import { UserActivityEntity } from './auth/entities/user-activity.entitiy';
import { TransactionModule } from './transaction/transaction.module';
import { TransactiontEntity } from './transaction/entities/transaction.entity';
import { CardStatusModule } from './card-status/card-status.module';
import { CardStatusEntity } from './card-status/entities/card-status.entity';
import { CardPinModule } from './card-pin/card-pin.module';
import { CardPinEntity } from './card-pin/entities/card-pin.entity';


@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST,
    //   port: Number(process.env.DATABASE_PORT),
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_DB,
    //   entities: [User, Blog],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'oracle',
      poolSize: 1,
      username: process.env.ORA_USER,
      password: process.env.ORA_PASSWORD,
      connectString: '10.0.4.181:1539/ATMRPT',
      entities: 
      [
        User,
        UserActivityEntity,
        ProductEntity,
        TransactiontEntity,
        CardStatusEntity,
        CardPinEntity
      ],
      //synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    TransactionModule,
    CardStatusModule,
    CardPinModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
