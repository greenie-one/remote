import { UrlShortenerDTO } from '@/dtos/urlShortener.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { shortenUrlService } from '@/services/shortenUrl.service';
import { Controller } from '@/utils/decorators/controller';
import { Post } from '@/utils/decorators/methods';
import { Body } from '@/utils/decorators/request';
import { HttpException } from '@exceptions/httpException';

@Controller('/urlShortener')
export default class UrlShortenerController {
  @Post('/shorten')
  async shortenUrl(@Body() data: UrlShortenerDTO) {
    try {
      return shortenUrlService.shortenUrl(data.url);
    } catch (error) {
      throw new HttpException(ErrorEnum.VERIFICATIONLINK_NOT_SENT);
    }
  }
}
