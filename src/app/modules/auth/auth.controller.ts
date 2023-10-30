import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const registerData = req.body;

  const result = await AuthService.register(registerData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully!',
    data: result,
  });
});

const login = catchAsync(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const loginData = req.body;

    const result = await AuthService.login(loginData);

    const { refreshToken, ...restLoginData } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Logged in successfully',
      data: restLoginData,
    });
  }
);

export const AuthController = {
  register,
  login,
};
