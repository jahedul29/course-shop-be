import { User, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';

const isUserExist = async (email: string): Promise<User | null> => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};

const isPasswordMatch = async (
  givenPassword: string,
  userPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, userPassword);
};

const generateUserId = async (role: UserRole): Promise<string> => {
  const lastUser = await prisma.user.findFirst({
    where: {
      role,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (lastUser) {
    const numericPart = lastUser.userId.split('-')[1];
    return `${role === UserRole.ADMIN ? 'A-' : 'S-'}${(
      parseFloat(numericPart) + 1
    )
      .toString()
      .padStart(5, '0')}`;
  } else {
    if (role === UserRole.ADMIN) {
      return 'A-00001';
    } else {
      return 'S-00001';
    }
  }
};

export const AuthUtils = {
  isUserExist,
  isPasswordMatch,
  generateUserId,
};
