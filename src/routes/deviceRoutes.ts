import express from 'express';
import {getAllDevices, getDevice, updateDevice, deleteDevice, createDevice} from '../controllers/deviceController';

const router = express.Router();


router.get('/all', getAllDevices );


router.get('/get/:id', getDevice );


router.put('/update', updateDevice );

router.delete('/delete/:id', deleteDevice);

router.post('/create/', createDevice);

export default router;