import { IsString } from 'class-validator';

export class SendPeerLinkDTO {
  @IsString()
  public email: string;

  @IsString()
  public phone: string;

  @IsString()
  public verifierName: string;

  @IsString()
  public userName: string;

  @IsString()
  public mobileVerificationLink: string;

  @IsString()
  public emailVerificationLink: string;
}
