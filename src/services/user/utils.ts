import * as bcrypt from 'bcrypt';

import { config } from '#config';

export const getPasswordHash = async (password: string): Promise<string> => {
    const { saltRounds } = config.entities.user.password;
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(password, salt);
};
