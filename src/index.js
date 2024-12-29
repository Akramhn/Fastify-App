import fastify from './app.js';

const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:5000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
