
import { Router } from 'express';

import { uploadRecording, findRecording } from '../controllers/recordings';

const recordingRouter: Router = Router();
recordingRouter.post('/recordings/upload', uploadRecording);
recordingRouter.get('/recordings/:recordingId', findRecording);

export default recordingRouter;