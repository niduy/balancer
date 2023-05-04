import { Injectable } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { MarketService } from './market.service';

@Injectable()
export class AppService {
  constructor(
    private readonly balance: BalanceService,
    private readonly market: MarketService,
  ) {}

  async getBalance(address: string) {
    return this.balance.getBalance(address);
  }

  async getLatestRates() {
    return this.market.getLatestRates();
  }
}
