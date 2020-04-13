import { Model, Association, DataTypes, UUIDV4 } from 'sequelize';

import { getSequelize } from '../sequelize';

export class User extends Model {
    id!: string;
    age!: number;
    login!: string;
    password!: string;
    passwordSalt!: string;
    isDeleted!: boolean;

    static association: Association;

    static associate(models) {
        this.association = models.User.belongsToMany(models.Group, {
            through: models.UserGroup,
            as: 'groups',
            foreignKey: 'userId'
        });
    }

    static initialize() {
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
            passwordSalt: {
                allowNull: false,
                type: DataTypes.STRING
            },
            isDeleted: {
                allowNull: false,
                defaultValue: false,
                type: DataTypes.BOOLEAN
            }
        }, {
            sequelize: getSequelize(),
            modelName: 'user'
        });
    }
}
