import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardsDto } from './dto/get-board.dto';

@Controller('board')
export class BoardController {
  @Post()
  // 본문(바디) - Post, Put, Patch 요청
  create(@Body() createBoardDto: CreateBoardDto) {
    const { title, content } = createBoardDto;
    return title + content;
  }

  @Get() // localhost:3000/board?offset=0&limit=10
  get(@Query() getBoardsDto: GetBoardsDto) {
    const { offset, limit } = getBoardsDto;
    console.log(offset, limit);
  }
}
