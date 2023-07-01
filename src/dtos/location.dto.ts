import { IsEnum, IsObject } from 'class-validator';

export enum IDTypeEnum {
  AADHAR = 'AADHAR',
  PAN = 'PAN',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
}

export class locationDto {
  @IsObject()
  public address: object;

  @IsEnum(IDTypeEnum)
  public type: IDTypeEnum;
}
