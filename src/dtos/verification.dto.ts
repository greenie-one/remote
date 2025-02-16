import { IsEmail, IsString, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'validateMobile', async: false })
class ValidateMobile implements ValidatorConstraintInterface {
  validate(text: string) {
    const regex = new RegExp(/^(\+91)[0-9]{10}$/);
    return regex.test(text);
  }
}

export class WorkPeerDTO {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Validate(ValidateMobile, { message: 'Invalid mobile number' })
  public phone: string;

  @IsString()
  public verifierName: string;

  @IsString()
  public userName: string;

  @IsString()
  public mobileVerificationLink: string;

  @IsString()
  public emailVerificationLink: string;

  @IsString()
  public companyName: string;
}

export class ResidentialPeerDTO {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Validate(ValidateMobile, { message: 'Invalid mobile number' })
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
