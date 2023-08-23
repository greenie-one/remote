import { App } from '@/app';
import '@/utils/mock/index';
import { ValidateEnv } from '@utils/validateEnv';
import LocationController from './controllers/location.controller';
import OtpController from './controllers/otp.controller';
import RootController from './controllers/root.controller';
import WaitlistController from './controllers/waitlist.controller';
import WorkExController from './controllers/workEx.controller';
import ZoopController from './controllers/zoop.controller';
import EmailerController from './controllers/emailer.controller';

process.on('uncaughtException', (e) => {
  console.error(e);
  process.exit(-1);
});

process.on('unhandledRejection', (e) => {
  console.error(e);
  process.exit(-1);
});

ValidateEnv();

const controllers = [OtpController, WaitlistController, RootController, LocationController, WorkExController, ZoopController, EmailerController];

const app = new App(controllers);

app.listen();
