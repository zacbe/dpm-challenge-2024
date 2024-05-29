

interface RecordingInput {
  recording: Buffer;
  user_email: string;
}

interface Models {
  Recording: any;
}

async function insertRecording(body: RecordingInput, models: Models): Promise<typeof Recording | null> {
  const { Recording } = models;

  try {
    const recording = await Recording.create(body)
    return recording;

  } catch (error: any) {
    console.error(`Error creating order: ${error.message}`);
    throw error;
  }
}



async function findRecordingById(id: string, models: Models): Promise<typeof Recording | null> {
  const { Recording } = models;
  const recording = await Recording.findByPk(id);
  if (!recording) return null;
  return recording;
}

export { insertRecording, findRecordingById };