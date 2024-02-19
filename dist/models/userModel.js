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
exports.UserRole = exports.Users = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["SUPERUSER"] = "superuser";
    UserRole["ADMIN"] = "admin";
    UserRole["SUSPENDED"] = "SUSPENDED";
})(UserRole || (exports.UserRole = UserRole = {}));
let Users = class Users extends sequelize_typescript_1.Model {
};
exports.Users = Users;
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.BIGINT,
    }),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true
    }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true
    }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(UserRole)),
        allowNull: false
    }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    }),
    __metadata("design:type", String)
], Users.prototype, "refreshToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    }),
    __metadata("design:type", String)
], Users.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "deleted", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "sendNewletter", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Users.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Users.prototype, "updated_at", void 0);
exports.Users = Users = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "users",
        modelName: "Users"
    })
], Users);
