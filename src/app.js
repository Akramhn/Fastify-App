import fastify from 'fastify';
import dotenv from 'dotenv';
import db from '../models/index.js';
import cors from '@fastify/cors';
import fastifyJwt from 'fastify-jwt';
import authRoutes from './routes/auth.routes.js';


const app = fastify({ logger: true });

dotenv.config();


app.register(cors);
app.register(fastifyJwt, { secret: process.env.JWT_SECRET });


app.decorate('auth', function (handlers) {
  return async function (req, reply) {
    for (const handler of handlers) {
      await handler(req, reply);
    }
  };
});


authRoutes.forEach((route) => {
  const routeConfig = route(app); 
  app.route(routeConfig); 
});

export default app;
