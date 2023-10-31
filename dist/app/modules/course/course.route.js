"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(course_validation_1.CourseZodValidation.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), course_controller_1.CourseController.create);
router.get('/', course_controller_1.CourseController.findAll);
router.get('/:id', course_controller_1.CourseController.findOne);
exports.CourseRouter = router;
