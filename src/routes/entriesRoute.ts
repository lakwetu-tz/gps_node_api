import express from 'express';
import { entriesParams, entriesExtends } from '../controllers/entriesController';

const router = express.Router();


router.post('/params', entriesParams );

router.post('/extends', entriesExtends );

export default router;