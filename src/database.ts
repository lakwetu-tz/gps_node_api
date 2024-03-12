import { Sequelize } from 'sequelize-typescript';
import Devices from './models/deviceModel';
import Vehicles from './models/vehicleModel';
import Drivers from './models/driverModel';
import { Users } from './models/userModel';
import Routes from './models/routeModel';
import Alerts from './models/alertModel';
import GeoFence from './models/geoFenceModel';


// Create a Sequelize instance
const database = new Sequelize({
    database: 'trackingdb',
    username: 'tracking',
    password: 'tracking@2024',
    host: 'localhost', 
    dialect: 'postgres', 
    logging: false
});

database.addModels([Devices]);
database.addModels([Vehicles]);
database.addModels([Drivers]);
database.addModels([Users]);
database.addModels([Routes]);
database.addModels([Alerts])
database.addModels([GeoFence])

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