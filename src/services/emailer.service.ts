import { emailerDto } from '@/dtos/emailer.dto';
import { ErrorEnum } from '@/exceptions/errorCodes';
import { HttpException } from '@/exceptions/httpException';
import { mailer } from '@/remote/generic/emailer';

class EmailerService {
  public async sendEmail(data: emailerDto) {
    try {
      await mailer.sendMail({
        to: data.email,
        subject: data.subject,
        text: data.message,
      });
      return { success: true };
    } catch (error) {
      throw new HttpException(ErrorEnum.EMAIL_NOT_SENT);
    }
  }
}

export const emailService = new EmailerService();
