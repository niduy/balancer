import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/assets/all')
  async getBalances(@Query('address') address: string) {
    return this.appService.getBalance(address);
  }

  @Get('/api/marketCap')
  getLatestRates() {
    return this.appService.getLatestRates();
  }
}
