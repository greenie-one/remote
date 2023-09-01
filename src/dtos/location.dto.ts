import { IsOptional, IsString } from 'class-validator';

export class locationDto {
  @IsOptional()
  @IsString()
  public address?: string;

  @IsOptional()
  @IsString()
  public placeId?: string;
}
