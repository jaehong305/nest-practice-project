import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { AppController } from './app.controller';
import { BoardModule } from './apis/board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'myproject',
      entities: [__dirname + '/apis/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
      logging: Boolean(process.env.DATABASE_LOGGING),
      timezone: 'Asia/Seoul',
    }),
    BoardModule,
  ],
  controllers: [ApiController, AppController], // ApiController가 먼저 처리
  providers: [],
})
export class AppModule {}
