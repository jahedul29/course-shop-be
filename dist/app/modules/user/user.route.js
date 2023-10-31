"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const userRouter = express_1.default.Router();
userRouter.get('/', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.findAll);
userRouter.get('/:id', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.findOne);
userRouter.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserZodValidation.update), (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.updateOne);
userRouter.delete('/:id', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserController.deleteOne);
exports.UserRouter = userRouter;
