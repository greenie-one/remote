import 'reflect-metadata';
import './utils/logger';

import fastifyCookie from '@fastify/cookie';
import middie from '@fastify/middie';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { ClassConstructor } from 'class-transformer';
import compression from 'compression';
import cors from 'cors';
import fastify from 'fastify';
import helmet from 'helmet';
import hpp from 'hpp';
import { env } from './config';
import { registerControllers } from './controllers';
import { mockFetch } from './utils/mock';

export class App {
  public app: ReturnType<typeof fastify>;
  public env: string;
  public port: number;

  private controllers: Controllers = [];

  constructor(controllers: ClassConstructor<object>[]) {
    this.env = env('APP_ENV', 'dev');
    this.port = env('PORT', 8080);

    this.populateControllers(controllers);
  }

  public async listen() {
    mockFetch();
    this.app = fastify({
      logger: false,
    });
    await this.initializeMiddlewares();
    this.initializeErrorHandling();

    registerControllers(this.app, this.controllers);
    await this.app.listen({
      host: '0.0.0.0',
      port: this.port,
    });

    console.info('');
    console.info(`==============================`);
    console.info(`====== ENV: ${this.env} ======`);
    console.info(`App listening on the port ${this.port}`);
    console.info(`==============================`);
    console.info('');
  }

  public getServer() {
    return this.app;
  }

  private async initializeMiddlewares() {
    this.app = await this.app.register(middie);

    this.app.register(fastifyCookie, {
      secret: 'my-secret',
      hook: 'onRequest',
    });

    this.app.use(cors({ origin: env('ORIGIN'), credentials: env('CREDENTIALS') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());

    this.app.addHook('onRequest', async (req) => {
      console.debug(`Got request: [${req.method}] ${req.url} ${JSON.stringify(req.headers)}`);
    });

    this.app.addHook('onResponse', async (req, reply) => {
      console.debug(`Request: [${req.method}] ${req.url} - ${reply.getResponseTime().toFixed(5)}ms`);
    });
  }

  private initializeErrorHandling() {
    this.app.setErrorHandler(ErrorMiddleware);
  }

  private populateControllers(controllerClasses: ClassConstructor<object>[]) {
    for (const c of controllerClasses) {
      this.controllers.push({
        constructor: c,
        instance: new c(),
      });
    }
  }
}
