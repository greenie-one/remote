import { IsEnum, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export enum OtpType {
  EMAIL = 'EMAIL',
  MOBILE = 'MOBILE',
}

@ValidatorConstraint({ name: 'validateContact', async: false })
class ValidateContact implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const type = args.object['type'];
    if (type === OtpType.EMAIL) {
      const regex = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
      return regex.test(text);
    } else if (type === OtpType.MOBILE) {
      const regex = new RegExp(/^(\+91)[0-9]{10}$/);
      return regex.test(text);
    }
  }
}

export class SendOtpDto {
  @Validate(ValidateContact, { message: 'Invalid contact' })
  public contact: string;

  @IsEnum(OtpType)
  public type: OtpType;
}
