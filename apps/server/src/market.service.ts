import { CoingeckoService } from './coingecko.service';
import { PrismaService } from './prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

const GET_COIN_LIST_CRON_JOB_ID = uuidv4();

type RawCoin = {
  symbol?: string;
  current_price?: number;
};

type MapCoinsInput = RawCoin[];

const mapCoins = (coins: MapCoinsInput) => {
  return coins
    .filter((coin) => coin.symbol && coin.current_price)
    .map((coin) => ({
      name: coin.symbol,
      usdRate: coin.current_price,
      date: new Date(),
    }));
};

@Injectable()
export class MarketService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly prisma: PrismaService,
    private readonly coingecko: CoingeckoService,
  ) {}

  async getLatestRates() {
    const uniqueSymbols = await this.prisma.coin.groupBy({
      by: ['name'],
      _count: true,
    });

    const latestRates = await Promise.all(
      uniqueSymbols.map(async (coin) => {
        return this.prisma.coin.findFirst({
          where: { name: coin.name },
          orderBy: { date: 'desc' },
        });
      }),
    );

    return latestRates;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  private async getCoinList() {
    if (!this.shouldGetCoinListExecute()) return;

    const rawCoins = await this.coingecko.getCoinList();
    const coins = mapCoins(rawCoins);

    const transactions = coins.map((coin) =>
      this.prisma.coin.create({ data: coin }),
    );

    return this.prisma.$transaction(transactions);
  }

  private async shouldGetCoinListExecute() {
    const currentCronId = await this.redis.get('GET_COIN_LIST_CRON_JOB_ID');
    if (currentCronId && currentCronId !== GET_COIN_LIST_CRON_JOB_ID)
      return false;

    await this.redis.set(
      'GET_COIN_LIST_CRON_JOB_ID',
      GET_COIN_LIST_CRON_JOB_ID,
      'EX',
      60 * 10,
    );

    return true;
  }
}
