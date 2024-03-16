"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAlerts = void 0;
const alertModel_1 = __importDefault(require("../models/alertModel"));
const getAllAlerts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drivers = yield alertModel_1.default.findAll();
        return res.status(200).json({ drivers });
    }
    catch (error) {
        console.error("Error fetching drivers:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllAlerts = getAllAlerts;
