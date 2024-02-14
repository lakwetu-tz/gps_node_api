import express from "express";
import { login, getAllUsers, register, getUserById, updateUser, deleteUser, logout, refreshToken } from "../controllers/userController";

const router = express.Router();

// Register a new user
router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout),

router.get('/refresh', refreshToken)

router.get("/all", getAllUsers);

router.get("/get/:id", getUserById)

router.put("/update/:id", updateUser)

router.delete("/delete/:id", deleteUser)


export default router;