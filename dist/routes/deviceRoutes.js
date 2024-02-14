"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deviceController_1 = require("../controllers/deviceController");
const router = express_1.default.Router();
router.get('/all', deviceController_1.getAllDevices);
router.get('/get/:id', deviceController_1.getDevice);
router.put('/update', deviceController_1.updateDevice);
router.delete('/delete/:id', deviceController_1.deleteDevice);
router.post('/create/', deviceController_1.createDevice);
exports.default = router;
