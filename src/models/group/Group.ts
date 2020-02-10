import { Model, DataTypes, UUIDV4 } from 'sequelize';

import * as T from './types';
import { sequelize } from '../sequelize';

export class Group extends Model {
    id!: string;
    name!: string;
    permissions!: T.Permission[];
}

Group.init({
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
        type: DataTypes.UUID
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    permissions: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
}, {
    sequelize,
    modelName: 'group'
});
