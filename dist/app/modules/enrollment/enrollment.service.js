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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const enrollment_contants_1 = require("./enrollment.contants");
const enrollIntoCourse = (courseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield prisma_1.default.course.findFirst({
        where: {
            id: courseId,
        },
    });
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Course does not exist');
    }
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    const existingEnrollment = yield prisma_1.default.enrollment.findFirst({
        where: {
            courseId,
            userId,
        },
    });
    if (existingEnrollment) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Student already enrolled in this course');
    }
    const enrollment = yield prisma_1.default.enrollment.create({
        data: {
            courseId: courseId,
            userId: userId,
        },
        include: {
            course: true,
            user: true,
        },
    });
    return enrollment;
});
const findAll = (filters, options, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: enrollment_contants_1.EnrollmentConstants.enrollmentSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (enrollment_contants_1.EnrollmentConstants.studentEnrolledCourseRelationalFields.includes(key)) {
                    return {
                        [enrollment_contants_1.EnrollmentConstants.studentEnrolledCourseRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                            mode: 'insensitive',
                        },
                    };
                }
            }),
        });
    }
    if (user.role === user_1.ENUM_USER_ROLE.STUDENT) {
        andConditions.push({
            userId: user.userId,
        });
    }
    const whereConditions = andConditions.length
        ? { AND: andConditions }
        : {};
    const result = yield prisma_1.default.enrollment.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            course: true,
            user: true,
        },
    });
    const total = yield prisma_1.default.enrollment.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const markCourseAsComplete = (courseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield prisma_1.default.course.findFirst({
        where: {
            id: courseId,
        },
    });
    if (!course) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Course does not exist');
    }
    const user = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    const existingEnrollment = yield prisma_1.default.enrollment.findFirst({
        where: {
            courseId,
            userId,
        },
    });
    if (!existingEnrollment) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Student not enrolled in this course');
    }
    const result = yield prisma_1.default.enrollment.update({
        where: {
            id: existingEnrollment.id,
        },
        data: {
            status: 'completed',
            progress: 100,
        },
    });
    return result;
});
exports.EnrollmentService = {
    enrollIntoCourse,
    findAll,
    markCourseAsComplete,
};
