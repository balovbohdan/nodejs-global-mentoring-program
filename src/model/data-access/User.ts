import { Model, DataTypes, UUIDV4 } from 'sequelize';

import { sequelize } from './sequelize';

export class User extends Model {
    id!: string;
    age!: number;
    login!: string;
    password!: string;
    isDeleted!: boolean;
}

User.init({
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
        type: DataTypes.UUID
    },
    age: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.DECIMAL
    },
    login: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    isDeleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    modelName: 'user'
});
