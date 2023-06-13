export enum ErrorEnum {
  // Validation
  VALIDATION_ERROR,

  //OTP
  OTP_NOT_SENT,

  //email
  EMAIL_NOT_SENT,
}

export const ErrorCodes: Record<ErrorEnum, ErrorCodes> = {
  [ErrorEnum.VALIDATION_ERROR]: {
    code: 'RM0000',
    message: '%s',
    status: 400,
  },
  [ErrorEnum.OTP_NOT_SENT]: {
    code: 'RM001',
    message: 'Failed To send OTP',
    status: 400,
  },
  [ErrorEnum.EMAIL_NOT_SENT]: {
    code: 'RM002',
    message: 'Failed To send Email',
    status: 400,
  },
};
