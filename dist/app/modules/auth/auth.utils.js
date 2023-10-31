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
exports.AuthUtils = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const isUserExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
});
const isPasswordMatch = (givenPassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(givenPassword, userPassword);
});
const generateUserId = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield prisma_1.default.user.findFirst({
        where: {
            role,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    if (lastUser) {
        const numericPart = lastUser.userId.split('-')[1];
        return `${role === client_1.UserRole.ADMIN ? 'A-' : 'S-'}${(parseFloat(numericPart) + 1)
            .toString()
            .padStart(5, '0')}`;
    }
    else {
        if (role === client_1.UserRole.ADMIN) {
            return 'A-00001';
        }
        else {
            return 'S-00001';
        }
    }
});
exports.AuthUtils = {
    isUserExist,
    isPasswordMatch,
    generateUserId,
};
