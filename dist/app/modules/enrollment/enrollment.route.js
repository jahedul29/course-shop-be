"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enrollment_controller_1 = require("./enrollment.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.STUDENT), enrollment_controller_1.EnrollmentController.findAll);
router.post('/enroll-into-course/:courseId/:userId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.STUDENT), enrollment_controller_1.EnrollmentController.enrollIntoCourse);
router.post('/mark-course-as-complete/:courseId/:userId', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.STUDENT), enrollment_controller_1.EnrollmentController.markCourseAsComplete);
exports.EnrollmentRouter = router;
