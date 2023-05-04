import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createPrismaRedisCache } from 'prisma-redis-middleware';
import Redis from 'ioredis';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();

    const redis = new Redis();

    const cacheMiddleware = createPrismaRedisCache({
      models: [{ model: 'Coin', cacheTime: 60, cacheKey: 'coin' }],
      storage: {
        type: 'redis',
        options: {
          client: redis,
          invalidation: { referencesTTL: 300 },
          log: console,
        },
      },
      cacheTime: 300,
      onError: (key) => console.error('oh shit', key),
    });

    this.$use(cacheMiddleware);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
