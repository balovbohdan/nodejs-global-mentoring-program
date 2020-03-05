import * as T from './types';
import { sequelize } from './sequelize';

export const createTransaction = <Response>(callback: T.CreateTransactionCallback<Response>): Promise<Response> => (
    sequelize.transaction<Response>(callback)
);
