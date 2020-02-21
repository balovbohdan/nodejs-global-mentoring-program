import { Association } from 'sequelize';

export interface CustomModel {
    associate?: (models) => Association;
}
