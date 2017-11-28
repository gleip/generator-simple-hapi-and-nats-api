// require('dotenv').config();
import * as Hapi from 'hapi';

// plugins
import * as AuthBearer from 'hapi-auth-bearer-token';
import * as Logger from 'pino';
import * as Inert from 'inert';
import * as Vision from 'vision';

// mq
import { connect } from 'nats';
import * as Hemera from 'nats-hemera';

// routes
import app from './routes';

const logger = Logger();

export interface DecoratedRequest extends Hapi.Request {
  hemera():Hemera;
}

export default class Server {
  constructor(private port:string) {}
  start() {
    try {
      const server = new Hapi.Server();
      server.connection({ port: this.port, routes: { cors: true } });
      server.register(
        [
          AuthBearer,
          Inert,
          Vision,
        ],
        async () => {
          const nats = connect(process.env.NATS || '');
          const hemera = new Hemera(nats, {
            logLevel: 'debug',
            childLogger: true,
          });
          server.auth.strategy('user', 'bearer-access-token', {
            validateFunc: async (token, callback) => {},
          });
          server.decorate('request', 'hemera', () => hemera);
          server.route(app);
          await server.start();
          logger.info('Server running at:', server.info!.uri);
        });
    } catch (error) {
      logger.error(error);
    }
  }
}

const server = new Server(process.env.PORT || '5000');
server.start();
