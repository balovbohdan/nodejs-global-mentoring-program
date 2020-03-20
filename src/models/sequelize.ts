import { Sequelize } from 'sequelize';

let sequelize: Sequelize|null = null;

export const getSequelize = (): Sequelize => {
    if (!sequelize) {
        sequelize = new Sequelize(process.env.POSTGRESQL_URI as string);
    }

    return sequelize as Sequelize;
};
