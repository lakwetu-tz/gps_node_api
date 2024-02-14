import database from './database'
import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import http from "http";
const cookieParser = require('cookie-parser');

import deviceRoutes from './routes/deviceRoutes'
import VehicleRoutes from "./routes/vehicleRoutes";
import driverRoutes from './routes/driverController';
import userRoutes from './routes/usersRoutes'
import entriesRoutes from "./routes/entriesRoute";
import Vehicle from "./models/vehicleModel";
import "./database";
import { Server } from 'socket.io';

import { logger } from './middleware/logEvents';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { connectionStateRecovery: {} });
const port = process.env.PORT

app.set("io", io);

app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(cookieParser())
    .use(logger)
    .use(errorHandler)
    .use("/api/v1/device", deviceRoutes)
    .use("/api/v1/driver", driverRoutes)
    .use("/api/v1/vehicle", VehicleRoutes)
    .use("/api/v1/user", userRoutes)
    .use("/api/v1/entries", entriesRoutes)


    .get("/healthz", (req, res) => { return res.json({ ok: true, environment: process.env.NODE_ENV }) })

    io.on("connection", (socket: any) => {
        console.log("socket connected")

    })
    

server.listen(port, async () => {
    try {

        await database.authenticate();
        console.log('Database connection has been established successfully.');

        console.log(`api running on ${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

});