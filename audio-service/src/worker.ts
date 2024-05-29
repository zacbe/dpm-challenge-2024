import amqp from 'amqplib';
import { env } from './utils/envConfig';
import { publishToQueue, connectRabbitMQ, } from './services';
import audioServiceClient from './libs/audioServiceClient';

const JOB_QUEUE = env.JOB_QUEUE;
const RABBITMQ_URL = env.RABBITMQ_URL;
const COMPLETION_QUEUE = env.COMPLETION_QUEUE;

const processRecording = async (message: string) => {
  const { id, user_email, timestamp } = JSON.parse(message);
  console.log(`Processing recording with ID: ${id}, User Email: ${user_email}, Timestamp: ${timestamp}`);

  // fetch the recording from the database
  const recording = await audioServiceClient(id)

  // mock processing and correction of the audio
  await audioServiceClient(recording)

  console.log(`Completed processing for recording ID: ${id}`);

  const completionMessage = JSON.stringify({ id, user_email, status: 'completed', timestamp: new Date().toISOString() });
  await publishToQueue(COMPLETION_QUEUE, completionMessage);
};


const startWorker = async () => {
  try {
    await connectRabbitMQ();
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(JOB_QUEUE, { durable: true });

    console.log(`Waiting for messages in queue: ${JOB_QUEUE}`);

    channel.consume(JOB_QUEUE, async (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log(`Received message: ${message}`);

        try {
          await processRecording(message);
          channel.ack(msg);
        } catch (error) {
          console.error('Failed to process message:', error);
          channel.nack(msg, false, false);
        }
      }
    }, { noAck: false });



  } catch (error) {
    console.error('Failed to start worker:', error);
  }
};
startWorker();
