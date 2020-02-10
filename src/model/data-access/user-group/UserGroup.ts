import { Model, DataTypes, UUIDV4 } from 'sequelize';

import { sequelize } from '../sequelize';

export class UserGroup extends Model {
    id!: string;
    userId!: string;
    groupId!: string;
}

UserGroup.init({
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
        type: DataTypes.UUID
    },
    userId: {
        allowNull: false,
        type: DataTypes.UUID
    },
    groupId: {
        allowNull: false,
        type: DataTypes.UUID
    }
}, {
    sequelize,
    modelName: 'user_group'
});
