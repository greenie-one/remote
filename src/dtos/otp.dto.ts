import { IsEmail, IsEnum, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';

export enum otpType {
  EMAIL = 'EMAIL',
  MOBILE = 'MOBILE',
}

export class SendOtpDto {
  @IsEmail()
  @ValidateIf((o) => o.type === otpType.EMAIL)
  email: string;

  @ValidateIf((o) => o.type === otpType.MOBILE)
  mobile: string;

  @IsEnum(otpType)
  type: otpType;

  @IsString()
  otp: string;
}
