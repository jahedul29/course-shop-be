import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthZodValidation } from './auth.validation';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateRequest(AuthZodValidation.register),
  AuthController.register
);

authRouter.post(
  '/login',
  validateRequest(AuthZodValidation.login),
  AuthController.login
);

export const AuthRouter = authRouter;
