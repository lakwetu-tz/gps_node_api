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
exports.logout = exports.refreshToken = exports.suspendAccount = exports.loginClient = exports.registerClient = exports.login = exports.register = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// var JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// var REFRESH_SECRET_TOKEN = process.env.REFRESH_SECRET_TOKEN;
var JWT_SECRET_KEY = "2281ab61859ef57f09a8e34f7e0adeb153f671808891c2ec4ca466f6dc903bf0a2a3c221ccc28ee44f8b37854b8212f77d622cf4d9e2833f2fe911d463943917";
var REFRESH_SECRET_TOKEN = "48333719306cb57d4739ec731d3a023f33f7df0a8fc45b61a95ba577ecce67d94dbde35ba0aabb960bc5c648987db78950bb6b1ccc092238739d3bfd544f6a46";
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.Users.findAll({
            order: [['created_at', 'DESC']] // Sort by created_at field in descending order
        });
        if (users.length === 0) {
            // If no users found, return a response indicating no users found
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const user = yield userModel_1.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password, role } = req.body;
    try {
        const user = yield userModel_1.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield user.update({ username, password, role });
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateUser = updateUser;
// Delete an existing user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Check if the user exists
        const user = yield userModel_1.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Delete the user
        yield user.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, phone } = req.body;
    try {
        if (!username || !password || !phone) {
            return res.status(401).json({ error: "All fields are required" });
        }
        // Check if username already exists
        const existingUser = yield userModel_1.Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(402).json({ error: "Username already exists" });
        }
        const existingPhone = yield userModel_1.Users.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(403).json({ error: "Phone number already exists" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the new user
        const newUser = yield userModel_1.Users.create({ username, password: hashedPassword, phone, role: userModel_1.UserRole.USER });
        return res.status(200).json(newUser);
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
});
exports.register = register;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    try {
        // Find user by username
        const user = yield userModel_1.Users.findOne({ where: { phone } });
        if (!user) {
            return res.status(404).json({ error: "phone number not found" });
        }
        // Check password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ "phone": user.phone, "role": userModel_1.UserRole.USER }, JWT_SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = jsonwebtoken_1.default.sign({ "phone": user.phone }, REFRESH_SECRET_TOKEN, { expiresIn: '1d' });
        // Saving refreshToken
        user.refreshToken = refreshToken;
        yield user.save();
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({ id: user.id, accessToken });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
const registerClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Check if username already exists
        const existingUser = yield userModel_1.Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(401).json({ error: "Username already exists" });
        }
        const existingEmail = yield userModel_1.Users.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(402).json({ error: "Email number already exists" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the new user
        const newUser = yield userModel_1.Users.create({ username, password: hashedPassword, email, role: userModel_1.UserRole.USER });
        return res.status(200).json(newUser);
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
});
exports.registerClient = registerClient;
const loginClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        let user;
        // Find user by email or username
        if (email) {
            user = yield userModel_1.Users.findOne({ where: { email } });
        }
        else if (username) {
            user = yield userModel_1.Users.findOne({ where: { username } });
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Check password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ "id": user.id, "role": userModel_1.UserRole.USER }, JWT_SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = jsonwebtoken_1.default.sign({ "id": user.id }, REFRESH_SECRET_TOKEN, { expiresIn: '1d' });
        // Saving refreshToken
        user.refreshToken = refreshToken;
        yield user.save();
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({ id: user.id, accessToken });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.loginClient = loginClient;
// Suspend user account
const suspendAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Find user by ID
        const user = yield userModel_1.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Update user role to SUSPENDED
        yield user.update({ role: userModel_1.UserRole.SUSPENDED });
        return res.status(200).json({ message: "User account suspended successfully" });
    }
    catch (error) {
        console.error("Error suspending user account:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.suspendAccount = suspendAccount;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = yield userModel_1.Users.findOne({ where: { refreshToken } });
    if (!user) {
        return res.status(403).json({ error: "token not found" });
    }
    jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET_TOKEN, (err, decoded) => {
        if (err || user.phone !== decoded.phone) {
            return res.sendStatus(403).send({ error: "invalid username" });
        }
        const roles = Object.values(user.role);
        const accessToken = jsonwebtoken_1.default.sign({ "phone": decoded.phone, "roles": roles }, REFRESH_SECRET_TOKEN, { expiresIn: '1d' });
        res.json({ roles, accessToken });
    });
});
exports.refreshToken = refreshToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        return res.status(204).json({ error: "No content" });
    }
    const refreshToken = cookies.jwt;
    // Is refreshToken in db?
    const user = yield userModel_1.Users.findOne({ where: { refreshToken } });
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.status(204);
    }
    // Delete refreshToken in db
    user.refreshToken = '';
    yield user.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(204);
});
exports.logout = logout;
