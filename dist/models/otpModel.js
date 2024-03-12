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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var OTP_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let OTP = OTP_1 = class OTP extends sequelize_typescript_1.Model {
    static sendSMS(phoneNumber, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Replace `sendSMS` with your actual SMS sending function
                const smsResponse = yield OTP_1.sendSMS(phoneNumber, message);
                console.log("SMS sent successfully: ", smsResponse);
            }
            catch (error) {
                console.error("Error occurred while sending SMS: ", error);
                throw error;
            }
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.BIGINT,
    }),
    __metadata("design:type", Number)
], OTP.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true
    }),
    __metadata("design:type", String)
], OTP.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true
    }),
    __metadata("design:type", String)
], OTP.prototype, "otp", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], OTP.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], OTP.prototype, "updated_at", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OTP, "sendSMS", null);
OTP = OTP_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "otp",
        modelName: "OTP",
    })
], OTP);
exports.default = OTP;
