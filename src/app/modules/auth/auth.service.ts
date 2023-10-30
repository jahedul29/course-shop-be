import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { UserUtils } from '../user/user.utils';
import { ILoginResponse, ILoginUser } from './auth.interface';
import { AuthUtils } from './auth.utils';

const register = async (payload: User): Promise<User | null> => {
  payload.password = await UserUtils.hashPassword(payload.password);

  const userId = await AuthUtils.generateUserId(payload.role);
  payload.userId = userId;

  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

const login = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await AuthUtils.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!(await AuthUtils.isPasswordMatch(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not match');
  }

  const accessToken = await JwtHelpers.createToken(
    { userId: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = await JwtHelpers.createToken(
    { userId: isUserExist.id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  register,
  login,
};
