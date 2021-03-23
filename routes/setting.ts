import * as express from 'express';
import { getSettings } from '../services/setting/settingService';

const router = express.Router();

router.get('/', getSettings);

export default router;
