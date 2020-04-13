import * as bcrypt from 'bcrypt';

import { config } from '#config';

import * as T from './types';

export const genPasswordSalt = (): Promise<string> => {
    const { saltRounds } = config.entities.user.password;

    return bcrypt.genSalt(saltRounds);
};

export const getPasswordHash = async (password: string, passwordSalt: string): Promise<string> => (
    bcrypt.hash(password, passwordSalt)
);

export const verifyPassword = async ({ passwordToVerify, passwordHash, passwordSalt }: T.VerifyPasswordInput) => {
    const passwordHashToVerify = await getPasswordHash(passwordToVerify, passwordSalt);
    const isPasswordValid = passwordHashToVerify === passwordHash;

    if (!isPasswordValid) {
        throw new Error('Failed to verify user\'s password.');
    }
};
