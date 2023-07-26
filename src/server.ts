import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import LocationController from './controllers/location.controller';
import OtpController from './controllers/otp.controller';
import RootController from './controllers/root.controller';
import VerificationController from './controllers/verification.controller';
import WaitlistController from './controllers/waitlist.controller';

process.on('uncaughtException', (e) => {
  console.error(e);
  process.exit(-1);
});

process.on('unhandledRejection', (e) => {
  console.error(e);
  process.exit(-1);
});

ValidateEnv();

const controllers = [OtpController, WaitlistController, RootController, LocationController, VerificationController];

const app = new App(controllers);

app.listen();
