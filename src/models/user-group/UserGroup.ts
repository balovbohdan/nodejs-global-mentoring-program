import { Model, DataTypes, UUIDV4 } from 'sequelize';

import { getSequelize } from '../sequelize';

export class UserGroup extends Model {
    id!: string;
    userId!: string;
    groupId!: string;

    static initialize() {
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
            sequelize: getSequelize(),
            modelName: 'user_group'
        });
    }
}
