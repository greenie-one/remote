import { env } from '@/config';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { AadhaarVerification } from '@/remote/zoop/aadhar.remote';
import { DrivinLicenseVerification } from '@/remote/zoop/drivingLicense.remote';
import { DummyAadharOtpResponse, DummyAadharVerifyResponse, DummyDLResponse, DummyPanResponse } from '@/remote/zoop/dummy.response';
import { PanVerification } from '@/remote/zoop/pan.remote';

class ZoopService {
  public async callPan(panNumber: string, taskId: string) {
    if (env('APP_ENV') !== 'production') {
      return PanVerification.verifyPan(panNumber, taskId).catch(console.error);
    }
    return DummyPanResponse;
  }

  public async callDrivingLicense(dlNumber: string, dob: string, taskId: string) {
    if (env('APP_ENV') !== 'production') {
      try {
        return DrivinLicenseVerification.verifyDrivingLicense(dlNumber, dob, taskId).catch(console.error);
      } catch (error) {
        throw new HttpException(ErrorEnum.ZOOP_ERROR, error.message);
      }
    }
    return DummyDLResponse;
  }

  public async callAadharOtp(aadharNumber: string, taskId: string) {
    if (env('APP_ENV') !== 'production') {
      try {
        return AadhaarVerification.requestAadharOtp(aadharNumber, taskId).catch(console.error);
      } catch (error) {
        throw new HttpException(ErrorEnum.ZOOP_ERROR, error.message);
      }
    }
    return DummyAadharOtpResponse;
  }

  public async callAadharVerify(requestId: string, otp: string, taskId: string) {
    if (env('APP_ENV') !== 'production') {
      try {
        return AadhaarVerification.verifyAadharOtp(requestId, otp, taskId).catch(console.error);
      } catch (error) {
        throw new HttpException(ErrorEnum.ZOOP_ERROR, error.message);
      }
    }
    return DummyAadharVerifyResponse;
  }
}

export const zoopService = new ZoopService();
