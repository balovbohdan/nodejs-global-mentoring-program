import { Association, Transaction } from 'sequelize';

export interface CustomModel {
    associate?: (models) => Association;
}

export type CreateTransactionCallback<Response> = (transaction: Transaction) => (
  Promise<Response>
);
