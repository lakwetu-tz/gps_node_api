"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Devices = class Devices extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Devices.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true
    }),
    __metadata("design:type", String)
], Devices.prototype, "imei", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true
    }),
    __metadata("design:type", String)
], Devices.prototype, "simCard", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Devices.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Devices.prototype, "model", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Devices.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }),
    __metadata("design:type", Boolean)
], Devices.prototype, "mobileData", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "axisX", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "axisY", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "axisZ", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "batteryLevel", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "digitalInput", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "ecoScore", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "externalVoltage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "gsmAreaCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "gsmCellId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "gsmSignal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Boolean)
], Devices.prototype, "sleepMode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "timestamp", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "totalOdometer", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], Devices.prototype, "unplug", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Devices.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Devices.prototype, "updated_at", void 0);
Devices = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "devices",
        modelName: "Devices",
    })
], Devices);
exports.default = Devices;
