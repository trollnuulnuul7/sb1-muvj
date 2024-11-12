import express from 'express';
import { healthCheck, testEndpoint } from '../controllers/apiController.js';

export const router = express.Router();

router.get('/health', healthCheck);
router.get('/test', testEndpoint);