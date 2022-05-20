import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { AppController } from './app.controller';
import { BoardModule } from './apis/board/board.module';

@Module({
  imports: [BoardModule],
  controllers: [ApiController, AppController], // ApiController가 먼저 처리
  providers: [],
})
export class AppModule {}
