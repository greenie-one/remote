export enum ErrorEnum {
  // Validation
  VALIDATION_ERROR,

  //OTP
  OTP_NOT_SENT,

  //email
  EMAIL_NOT_SENT,

  //address
  ADDRESS_NOT_FOUND,

  //verification
  VERIFICATIONLINK_NOT_SENT,

  // server error
  SERVER_ERROR,
  MAIL_NOT_SENT,
  SMS_NOT_SENT,

  // zoop
  ZOOP_ERROR,
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
  [ErrorEnum.ADDRESS_NOT_FOUND]: {
    code: 'RM003',
    message: 'Address not found',
    status: 400,
  },
  [ErrorEnum.VERIFICATIONLINK_NOT_SENT]: {
    code: 'RM004',
    message: 'Failed To send Verification Link',
    status: 400,
  },
  [ErrorEnum.SERVER_ERROR]: {
    code: 'RM005',
    message: 'Server Error: %s',
    status: 500,
  },
  [ErrorEnum.ZOOP_ERROR]: {
    code: 'RM006',
    message: 'Zoop Error: %s',
    status: 500,
  },
  [ErrorEnum.MAIL_NOT_SENT]: {
    code: 'RM007',
    message: 'Mail not sent',
    status: 500,
  },
  [ErrorEnum.SMS_NOT_SENT]: {
    code: 'RM008',
    message: 'SMS not sent',
    status: 500,
  },
};
