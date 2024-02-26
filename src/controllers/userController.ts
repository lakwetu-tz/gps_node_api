import { Request, Response } from "express";
import { Users, UserRole } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

// var JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// var REFRESH_SECRET_TOKEN = process.env.REFRESH_SECRET_TOKEN;

var JWT_SECRET_KEY = "2281ab61859ef57f09a8e34f7e0adeb153f671808891c2ec4ca466f6dc903bf0a2a3c221ccc28ee44f8b37854b8212f77d622cf4d9e2833f2fe911d463943917";
var REFRESH_SECRET_TOKEN = "48333719306cb57d4739ec731d3a023f33f7df0a8fc45b61a95ba577ecce67d94dbde35ba0aabb960bc5c648987db78950bb6b1ccc092238739d3bfd544f6a46";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await Users.findAll({
            order: [['created_at', 'DESC']] // Sort by created_at field in descending order
        });

        if (users.length === 0) {
         
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    try {

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.update({ username, password, role });
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the user
        await user.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const register = async (req: Request, res: Response) => {
    const { username, password, phone } = req.body;
    try {
        if (!username || !password || !phone ) {
            return res.status(401).json({ error: "All fields are required" });
        }

        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(402).json({ error: "Username already exists" });
        }

        const existingPhone = await Users.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(403).json({ error: "Phone number already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({ username, password: hashedPassword, phone, role: UserRole.USER });
        return res.status(200).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
};


// Login
export const login = async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    try {
        // Find user by username
        const user = await Users.findOne({ where: { phone } });
        if (!user) {
            return res.status(404).json({ error: "phone number not found" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const accessToken = jwt.sign(
            { "phone": user.phone, "role": UserRole.USER }, JWT_SECRET_KEY, { expiresIn: '1h'}
        )

        const refreshToken = jwt.sign(
            { "phone": user.phone }, REFRESH_SECRET_TOKEN,{ expiresIn: '1d'}
        )

  
        user.refreshToken = refreshToken
        await user.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });


        return res.status(200).json({ id: user.id, accessToken });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const registerClient = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !password || !email ) {
            return res.status(400).json({ error: "All fields are required" });
        }

   
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(401).json({ error: "Username already exists" });
        }

        const existingEmail = await Users.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(402).json({ error: "Email number already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await Users.create({ username, password: hashedPassword, email, role: UserRole.USER });
        return res.status(200).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

export const loginClient = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        let user;


        if (email) {
            user = await Users.findOne({ where: { email } });
        } else if (username) {
            user = await Users.findOne({ where: { username } });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const accessToken = jwt.sign(
            { "id": user.id, "role": UserRole.USER }, JWT_SECRET_KEY, { expiresIn: '1h'}
        );

        const refreshToken = jwt.sign(
            { "id": user.id }, REFRESH_SECRET_TOKEN, { expiresIn: '1d'}
        );

        // Saving refreshToken
        user.refreshToken = refreshToken;
        await user.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

        return res.status(200).json({ id: user.id, accessToken });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Suspend user account
export const suspendAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Find user by ID
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user role to SUSPENDED
        await user.update({ role: UserRole.SUSPENDED });
        return res.status(200).json({ message: "User account suspended successfully" });
    } catch (error) {
        console.error("Error suspending user account:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const refreshToken =async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const user = await Users.findOne({ where: { refreshToken }});

    if (!user) {
        return res.status(403).json({ error: "token not found" });
    }

    jwt.verify(refreshToken, REFRESH_SECRET_TOKEN,
        (err: any, decoded: any) => {
            if (err || user.phone !== decoded.phone) {
                return res.sendStatus(403).send({ error: "invalid username"});
            }
            const roles = Object.values(user.role);

            const accessToken = jwt.sign({ "phone": decoded.phone, "roles": roles},
                REFRESH_SECRET_TOKEN,
                { expiresIn: '1d' }
            );
            res.json({ roles, accessToken })
        }
    );
}

export const logout = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt){
        return res.status(204).json({ error: "No content"})
    }

    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const user = await Users.findOne({ where: { refreshToken } })
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.status(204);
    }

    // Delete refreshToken in db
    user.refreshToken = '';
    await user.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(204);


}