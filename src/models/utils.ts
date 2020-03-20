import * as T from './types';
import { getSequelize } from './sequelize';

export const createTransaction = <Response>(callback: T.CreateTransactionCallback<Response>): Promise<Response> => (
    getSequelize().transaction<Response>(callback)
);
