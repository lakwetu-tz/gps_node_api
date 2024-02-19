"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const deviceModel_1 = __importDefault(require("./models/deviceModel"));
const vehicleModel_1 = __importDefault(require("./models/vehicleModel"));
const driverModel_1 = __importDefault(require("./models/driverModel"));
const userModel_1 = require("./models/userModel");
// Create a Sequelize instance
const database = new sequelize_typescript_1.Sequelize({
    database: 'trackingdb',
    username: 'tracking',
    password: 'tracking@2024',
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});
database.addModels([deviceModel_1.default]);
database.addModels([vehicleModel_1.default]);
database.addModels([driverModel_1.default]);
database.addModels([userModel_1.Users]);
database.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
database.sync()
    .then(() => {
    console.log('Models synchronized with the database.');
})
    .catch((error) => {
    console.error('Unable to synchronize models with the database:', error);
});
exports.default = database;
