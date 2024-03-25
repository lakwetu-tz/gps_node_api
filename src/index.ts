import database from './database'
import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import http from "http";
import nsq from 'nsqjs'
import { Request, Response} from 'express'
const cookieParser = require('cookie-parser');

import deviceRoutes from './routes/deviceRoute';
import VehicleRoutes from "./routes/vehicleRoute";
import driverRoutes from './routes/driverRoute';
import userRoutes from './routes/usersRoute';
import entriesRoutes from "./routes/entriesRoute";
import routeRoutes from './routes/routeRoute';
import alertRoutes from './routes/alertRoute';
import geoFenceRoutes from './routes/geoFenceRoute'

import "./database";
import SocketIO from 'socket.io';
import { logger } from './middleware/logEvents';
import { errorHandler } from './middleware/errorHandler';
import Vehicle from './models/vehicleModel'

interface EntryData {
  utime: string;
  priority: number;
  lat: number;
  lng: number;
  altitude: number;
  angle: number;
  speed: number;
  satellite: number;
}


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIO.Server(server, {
    cors: {
        origin: '*',
    },
});
const port = process.env.PORT || 8000

app.set("io", io);

app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors({ origin: '*'}))
    .use(cookieParser())
    .use(logger)
    .use(errorHandler)
    .use("/api/v1/device", deviceRoutes)
    .use("/api/v1/driver", driverRoutes)
    .use("/api/v1/vehicle", VehicleRoutes)
    .use("/api/v1/user", userRoutes)
    .use("/api/v1/entries", entriesRoutes)
    .use("/api/v1/route", routeRoutes)
    .use("/api/v1/alert", alertRoutes)
    .use("/api/v1/geoFence", geoFenceRoutes)

    .get("/healthz", (req, res) => { return res.json({ ok: true, environment: process.env.NODE_ENV }) })

    io.on("connection", (socket: SocketIO.Socket) => {
        console.log("socket connected", socket.id)

        socket.on('disconnect', () => {
            console.log('Client disconnect:' , socket.id)
        })
    })


const extendedDataReader = new nsq.Reader('extended_data_topic', 'extend', {
  nsqdTCPAddresses: ['127.0.0.1:4150']
});

const basicDataReader = new nsq.Reader('basic_data_topic', 'basic', {
  nsqdTCPAddresses: ['127.0.0.1:4150']
});

extendedDataReader.on('message', async (msg: any) => {
  
  const touch = () => {
    if (!msg.hasResponded) {
      console.log('Touch [%s]', msg.id)
      msg.touch()
      setTimeout(touch, msg.timeUntilTimeout() - 1000)
    }
  }

  const finish = () => {
    // console.log('Finished message [%s]: %s', msg.id, msg.body.toString())
    msg.finish()
  }

  console.log('Message timeout is %f secs.', msg.timeUntilTimeout() / 1000)
  setTimeout(touch, msg.timeUntilTimeout() - 1000)

  // Finish the message after 2 timeout periods and 1 second.
  setTimeout(finish, msg.timeUntilTimeout() * 2 + 1000)
})



basicDataReader.on('message', async (msg: any) => {
  
  try {
    const data: { data: EntryData[], imei: string } = JSON.parse(msg.body.toString());

    const vehicle = await Vehicle.findOne({ where: { deviceId: data.imei } });
    if (!vehicle) {
      console.log("[ERROR] could not find any vehicle ")
    }

    const latestEntry = data.data.reduce((latest, current) => {
      const latestTime = new Date(latest.utime);
      const currentTime = new Date(current.utime);
      return currentTime > latestTime ? current : latest;
    }, data.data[0]);

    await Vehicle.update({
      latitude: latestEntry.lat,
      longitude: latestEntry.lng,
      angle: latestEntry.angle,
      speed: latestEntry.speed,
      altitude: latestEntry.altitude,
      status: "active"
  }, { where: { deviceId: data.imei } });

  if (vehicle) {
    console.log({ message: "open socket on vehicle update event... "})
    io.emit("vehicleUpdated", vehicle);
  }

    console.log("[INFO] Vehicle database updated successfully");
  } catch (error) {
    console.error("Error updating vehicle:", error);
  }

  // Process the message as needed
  const touch = () => {
    if (!msg.hasResponded) {
      console.log('Touch [%s]', msg.id)
      msg.touch()

      // Touch the message again a second before the next timeout.
      setTimeout(touch, msg.timeUntilTimeout() - 1000)
    }
  }

  const finish = () => {
    console.log('Finished message [%s]', msg.id)
    msg.finish()
  }

  console.log('Message timeout is %f secs.', msg.timeUntilTimeout() / 1000)
  setTimeout(touch, msg.timeUntilTimeout() - 1000)

  // Finish the message after 2 timeout periods and 1 second.
  setTimeout(finish, msg.timeUntilTimeout() * 2 + 1000)
});


server.listen(port, async () => {
    try {
        await database.authenticate();
        console.log('[INFO] Database connection has been established successfully.');

        extendedDataReader.connect();
        console.log('[INFO] NSQ connection of extended topic established successfully');

        basicDataReader.connect();
        console.log('[INFO] NSQ connection of extended topic established successfully');

        console.log(`[OK] api running on ${port}`);
    } catch (error) {
        console.error('[ERROR] Unable to connect to the database:', error);
    }

});