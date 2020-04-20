import { Association, Transaction } from 'sequelize';

export interface CustomModel {
    associate?: (models) => Association;
    initialize?: Function;
}

export type CreateTransactionCallback<Response> = (transaction: Transaction) => (
  Promise<Response>
);
