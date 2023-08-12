import { AadhaarVerification } from '@/remote/zoop/aadhar.remote';
import { DrivinLicenseVerification } from '@/remote/zoop/drivingLicense.remote';
import { PanVerification } from '@/remote/zoop/pan.remote';

class ZoopService {
  public callPan(panNumber: string, taskId: string) {
    return PanVerification.verifyPan(panNumber, taskId);
  }

  public callDrivingLicense(dlNumber: string, dob: string, taskId: string) {
    return DrivinLicenseVerification.verifyDrivingLicense(dlNumber, dob, taskId);
  }

  public callAadharOtp(aadharNumber: string, taskId: string) {
    return AadhaarVerification.requestAadharOtp(aadharNumber, taskId);
  }

  public callAadharVerify(requestId: string, otp: string, taskId: string) {
    return AadhaarVerification.verifyAadharOtp(requestId, otp, taskId);
  }
}

export const zoopService = new ZoopService();
