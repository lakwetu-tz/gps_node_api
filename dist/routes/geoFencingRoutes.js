"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const geoFenceController_1 = require("../controllers/geoFenceController");
const router = express_1.default.Router();
router.post('/create', geoFenceController_1.createGeoFence);
router.get('/get/:id', geoFenceController_1.getGeoFenceById);
exports.default = router;
