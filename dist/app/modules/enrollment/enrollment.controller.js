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
exports.EnrollmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const enrollment_contants_1 = require("./enrollment.contants");
const enrollment_service_1 = require("./enrollment.service");
const enrollIntoCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, userId } = req.params;
    const result = yield enrollment_service_1.EnrollmentService.enrollIntoCourse(courseId, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Student enrolled into course successfully!',
        data: result,
    });
}));
const findAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, enrollment_contants_1.EnrollmentConstants.enrollmentFilterableFields);
    const paginationParams = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const user = req.user;
    const result = yield enrollment_service_1.EnrollmentService.findAll(filters, paginationParams, user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Enrollments retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const markCourseAsComplete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, userId } = req.params;
    const result = yield enrollment_service_1.EnrollmentService.markCourseAsComplete(courseId, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Course marked as completed successfully!',
        data: result,
    });
}));
exports.EnrollmentController = {
    enrollIntoCourse,
    findAll,
    markCourseAsComplete,
};
