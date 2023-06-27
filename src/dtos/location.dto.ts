import { IsString } from 'class-validator';

export class locationDto {
  @IsString()
  public address: string;
}
