import { Transaction } from 'sequelize';

import { sequelize } from './sequelize';

export const createTransaction = (): Promise<Transaction> => (
    sequelize.transaction()
);
