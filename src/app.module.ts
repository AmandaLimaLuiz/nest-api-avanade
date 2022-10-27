import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ProductService } from './products/products.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { LogisticsModule } from './logistics/logistics.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrdersModule, UsersModule, ProductsModule, LogisticsModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, ProductService, AuthService],
})
export class AppModule {}
