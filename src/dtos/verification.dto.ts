import { IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  public email: string;

  @IsString()
  public phone: string;

  @IsString()
  public verifierName: string;

  @IsString()
  public userName: string;

  @IsString()
  public verificationLink: string;
}
