
import * as Joi from 'joi';
import * as Hapi from 'hapi';
import controller from '../controllers';

const appRoutes: Hapi.RouteConfiguration[] = [
  {
    method: 'GET',
    path: '/test',
    handler: controller.test,
  }
];

export default appRoutes;

