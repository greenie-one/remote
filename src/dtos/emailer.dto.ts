import { IsNotEmpty, IsString } from 'class-validator';

export class emailerDto {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public subject: string;

  @IsString()
  @IsNotEmpty()
  public message: string;
}
