import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    return await this.boardRepository.save(createBoardDto);
  }

  async findAll(search): Promise<[Board[], number]> {
    const { title, content } = search;
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .select('board.title', 'title')
      .where('board.title = :title', { title })
      .orWhere('board.content = :content', { content })
      .getManyAndCount();

    console.log(result);
    return result;
  }
}
