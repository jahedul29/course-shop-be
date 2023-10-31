import express from 'express';
import { AuthRouter } from '../modules/auth/auth.router';
import { CourseRouter } from '../modules/course/course.route';
import { EnrollmentRouter } from '../modules/enrollment/enrollment.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
  {
    path: '/enrollments',
    route: EnrollmentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
