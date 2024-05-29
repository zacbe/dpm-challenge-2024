import dotenv from 'dotenv';
import { cleanEnv, host, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  // General
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 8081 }),
  CORS_ORIGIN: str({ default: 'http://localhost:3000' }),
  RABBITMQ_URL: str({ default: 'amqp://localhost' }),
  JOB_QUEUE: str({ default: 'recording_jobs' }),
  COMPLETION_QUEUE: str({ default: 'completion_notifications' }),
});