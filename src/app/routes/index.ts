import express from 'express';
import { AuthRouter } from '../modules/auth/auth.router';
import { CourseRouter } from '../modules/course/course.route';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
