import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://postgres:1111@localhost:5432/postgres');
