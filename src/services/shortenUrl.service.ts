import { redisClient } from '@/redisClient';
import { customAlphabet } from 'nanoid/async';

class ShortenUrlService {
  public async shortenUrl(url: string) {
    const urlId = await customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5)();

    const shortUrl = `${process.env.HOST_URL}/sr/${urlId}`;
    await redisClient.setEx(shortUrl, 60 * 60 * 26, url);
    return { shortenUrl: shortUrl };
  }
}

export const shortenUrlService = new ShortenUrlService();
