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
exports.CourseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const course_constants_1 = require("./course.constants");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { syllabus } = payload, courseData = __rest(payload, ["syllabus"]);
    const result = yield prisma_1.default.course.create({
        data: Object.assign(Object.assign({}, courseData), { 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            syllabus: syllabus }),
    });
    return result;
});
const findAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: course_constants_1.CourseConstants.courseSearchableFields.map(field => ({
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
                console.log({ key });
                return {
                    [key]: {
                        equals: filterData[key],
                        mode: 'insensitive',
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length
        ? { AND: andConditions }
        : {};
    const result = yield prisma_1.default.course.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.course.count({
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
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.course.findUnique({
        where: {
            id,
        },
    });
    if (result) {
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
});
const updateOne = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if ((payload === null || payload === void 0 ? void 0 : payload.syllabus) !== undefined) {
        // Extract and transform the syllabus field
        const syllabus = payload.syllabus;
        delete payload.syllabus; // Remove syllabus from the payload
        const result = yield prisma_1.default.course.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign({}, payload), { syllabus: {
                    set: syllabus,
                } }),
        });
        return result;
    }
    else {
        const existingCourse = yield prisma_1.default.course.findUnique({
            where: {
                id,
            },
        });
        if (!existingCourse) {
            return null;
        }
        const result = yield prisma_1.default.course.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign({}, payload), { syllabus: existingCourse.syllabus }),
        });
        return result;
    }
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.course.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CourseService = {
    create,
    findAll,
    findOne,
    updateOne,
    deleteOne,
};
