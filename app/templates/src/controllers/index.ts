import * as Hapi from 'hapi';
import * as Hemera from 'nats-hemera';
import * as Logger from 'pino';
import { DecoratedRequest } from '../server';

interface HemeraPath {
  topic: string;
  cmd: string;
  payload?: object;
  pubsub$?: boolean;
  timeout$?: number;
  queue$?: string;
}

const logger = Logger();

class HemeraClient {
  hemera: any | null = null;
  path: HemeraPath;
  payload: any;

  constructor(hemera, path: HemeraPath, payload) {
    this.hemera = hemera;
    this.path = path;
    this.payload = payload;
  }

  public async act() {
    if (this.hemera === null) {
      throw new Error('Hemera not initialized');
    } else {
      if (this.payload.cmd || this.payload.topic) {
        throw new Error(`Can't use 'cmd' or 'topic' in hemera payload: ${this.payload}`);
      }
      this.path.payload = this.payload;
      return this.hemera.act(this.path);
    }
  }
}

export interface AppController {
  test(request: DecoratedRequest, reply: Hapi.ReplyNoContinue): void;
}

const controller:AppController = {
  test(request, reply) {
    try {
      reply('test!');
    } catch (error) {
      logger.info(error);
      reply(error);
    }
  },
}

export default controller;