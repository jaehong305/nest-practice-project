import {
  BadRequestException,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  @Header('Set-Cookie', 'cookie=apple') // 헤더도 자동생성해주는 nest에 커스텀헤더 추가(헤더이름, 값)
  @HttpCode(401) // 성공응답 상태 강제 변경
  @Get('he*lo/*') // 와일드카드 라우팅
  getHello(@Req() req: Request /*@Res() res*/): string {
    throw new BadRequestException('강제 에러'); // 에러 발생 => 상태코드 400
    console.log(req); // 쿼리스트링, 파라미터, 헤더, 바디 등 정보를 가진 요청객체
    return 'hello'; // 응답 본문(객체를 리턴하면 직렬화를 통해 JSON으로 자동변환)
    // return res.status(200).send('hello'); // 익스프레스처럼 응답객체를 직접 다룰수도 있다.
  }

  @Redirect('http://127.0.0.1:5500/src/front/index.html', 301)
  @Get('redirect') // 쿼리스트링 => localhost:3000/redirect?id=nest
  redirect(@Query('id') id: string) {
    console.log('요청 처리 후 리다이렉트');
    if (id === 'nest') {
      return { url: 'https://docs.nestjs.com' }; // 요청에 따라 동적으로 리다이렉트
    }
  }

  @Get(':aa/param/:bb')
  routeParameter(
    @Param() params: { [key: string]: string }, // 라우트 파라미터가 여러개일 경우 객체로 한번에 받는건 권장 X
    @Param('aa') aa: string,
    @Param('bb') bb: string,
  ) {
    return params.aa + bb;
  }
}
