import { IsNotEmpty, IsString } from 'class-validator';

export class AadharOtp {
  @IsString()
  @IsNotEmpty()
  public aadharNumber: string;

  @IsString()
  @IsNotEmpty()
  public taskId: string;
}

export class AadharVerify {
  @IsString()
  @IsNotEmpty()
  public requestId: string;

  @IsString()
  @IsNotEmpty()
  public otp: string;

  @IsString()
  @IsNotEmpty()
  public taskId: string;
}

export class Pan {
  @IsString()
  @IsNotEmpty()
  public panNumber: string;

  @IsString()
  @IsNotEmpty()
  public taskId: string;
}

export class DrivingLicense {
  @IsString()
  @IsNotEmpty()
  public dlNumber: string;

  @IsString()
  @IsNotEmpty()
  public dob: string;

  @IsString()
  @IsNotEmpty()
  public taskId: string;
}
