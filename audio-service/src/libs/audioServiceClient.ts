/** Mock an external service that correct the typos on a recording */

type Recording = {
  id: string;
  user_email: string;
  recording: Buffer;
}

export default async function audioServiceClient (recording: Recording) {
  await new Promise(resolve => setTimeout(resolve, 5000));
  return recording;
};