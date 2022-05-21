import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardsDto } from './dto/get-board.dto';
import { SearchBoardsDto } from './dto/search-boards.dto';
import { Board } from './entities/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  // 본문(바디) - Post, Put, Patch 요청
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get('get') // localhost:3000/board?offset=0&limit=10
  get(@Query() getBoardsDto: GetBoardsDto) {
    const { offset, limit } = getBoardsDto;
    console.log(offset, limit);
  }

  @Get('get/boards')
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
  }

  @Get()
  getBoards(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() searchBoardDto: SearchBoardsDto,
  ): Promise<[Board[], number]> {
    return this.boardService.findAll(searchBoardDto);
  }
}
