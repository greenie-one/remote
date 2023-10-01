import { IsString } from 'class-validator';

export class UrlShortenerDTO {
  @IsString()
  public url: string;
}
