import amqp from 'amqplib';
import { env } from '../utils/envConfig';

let connection: amqp.Connection;
let channel: amqp.Channel;

const JOB_QUEUE = env.JOB_QUEUE;
const COMPLETION_QUEUE = env.COMPLETION_QUEUE;
const RABBITMQ_URL = env.RABBITMQ_URL;

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(JOB_QUEUE, { durable: true });
    await channel.assertQueue(COMPLETION_QUEUE, { durable: true });
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
};

export const publishToQueue = async (queue: string, message: string) => {
  if (!channel) {
    throw new Error('Channel is not created. Please connect to RabbitMQ first.');
  }
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
};


export const consumeCompletionNotifications = async (notifyClients: (message: string) => void) => {
  try {
    const connection = await amqp.connect(env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(COMPLETION_QUEUE, { durable: true });

    console.log(`Waiting for messages in queue: ${COMPLETION_QUEUE}`);

    channel.consume(COMPLETION_QUEUE, async (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log(`Received completion notification: ${message}`);
        notifyClients(message);
        channel.ack(msg);
      }
    }, { noAck: false });
  } catch (error) {
    console.error('Failed to consume completion notifications:', error);
  }
};