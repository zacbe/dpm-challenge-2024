
import { Router } from 'express';
import multer from 'multer';

import { uploadRecording, findRecording } from '../controllers/recordings';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const recordingRouter: Router = Router();

recordingRouter.post('/recordings/upload', upload.single('audio'), uploadRecording);
recordingRouter.get('/recordings/:recordingId', findRecording);

export default recordingRouter;