import { app } from './server';

const NODE_ENV = "development"
const HOST = "localhost"
const PORT = "3000"

const server = app.listen(PORT, () => {

  console.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  console.info('sigint received, shutting down');

  server.close(() => {
    console.info('HTTP server closed');
    process.exit(0);
  });

  setTimeout(() => {
    console.warn('Forcing shutdown due to timeout');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);