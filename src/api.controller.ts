import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':name.api.localhost' }) // 서브도메인 요청처리
export class ApiController {
  @Get('he*lo/*') // 같은 요청 다른 응답
  getHello(@HostParam('name') name: string): string {
    return name;
  }
}
