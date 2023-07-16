import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import OtpController from './controllers/otp.controller';
import WaitlistController from './controllers/waitlist.controller';
import RootController from './controllers/root.controller';
import LocationController from './controllers/location.controller';
import verificationController from './controllers/verification.controller';

process.on('uncaughtException', (e) => {
  console.error(e);
  process.exit(-1);
});

process.on('unhandledRejection', (e) => {
  console.error(e);
  process.exit(-1);
});

ValidateEnv();

const controllers = [OtpController, WaitlistController, RootController, LocationController, verificationController];

const app = new App(controllers);

app.listen();
