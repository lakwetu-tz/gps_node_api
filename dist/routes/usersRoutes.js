"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Register a new user
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
router.get("/logout", userController_1.logout),
    router.get('/refresh', userController_1.refreshToken);
router.get("/all", userController_1.getAllUsers);
router.get("/get/:id", userController_1.getUserById);
router.put("/update/:id", userController_1.updateUser);
router.delete("/delete/:id", userController_1.deleteUser);
exports.default = router;
