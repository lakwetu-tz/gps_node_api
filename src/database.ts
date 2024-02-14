import { Sequelize } from 'sequelize-typescript';
import Device from './models/deviceModel';
import Vehicle from './models/vehicleModel';
import Driver from './models/driverModel';
import { Users } from './models/userModel';
import Basics from './models/basicModel';

import { BasicListenerUpdateVehicle } from './listensers/listenBasics'

// Create a Sequelize instance
const database = new Sequelize({
    database: 'trackingdb',
    username: 'tracking',
    password: 'tracking@2024',
    host: 'localhost', 
    dialect: 'postgres', 
    logging: false
});

database.addModels([Device]);
database.addModels([Vehicle]);
database.addModels([Driver]);
database.addModels([Users]);
database.addModels([Basics])

database.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
    });


database.sync()
    .then(() => {
        console.log('Models synchronized with the database.');
    })
    .catch((error: any) => {
        console.error('Unable to synchronize models with the database:', error);
    });

export default database