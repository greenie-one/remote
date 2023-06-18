import { IsEmail, IsEnum, IsString, ValidateIf } from 'class-validator';

export enum otpType {
  EMAIL = 'EMAIL',
  MOBILE = 'MOBILE',
}

export class SendOtpDto {
  @IsEmail()
  @ValidateIf((o) => o.type === otpType.EMAIL)
  public contact: string;

  @ValidateIf((o) => o.type === otpType.MOBILE)
  public contact: string;

  @IsEnum(otpType)
  type: otpType;

  @IsString()
  otp: string;
}