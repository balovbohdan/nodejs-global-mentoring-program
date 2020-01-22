import { v4 } from 'uuid';
import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';

export class User extends Model {}

User.init({
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: v4(),
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
