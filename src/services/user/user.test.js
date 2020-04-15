import { v4 } from 'uuid';

import { User } from '#models';

import userService from '.';

jest.mock('#models/user/User');

const defaultUser = {
    id: v4(),
    age: 44,
    login: 'example@example.com',
    password: 'veryStrongPassword1111',
    isDeleted: false
};
const userInstance = {
    ...defaultUser,
    get() {
        return defaultUser;
    },
    async update() {}
};

User.findOne.mockReturnValue(Promise.resolve(userInstance));
User.create.mockReturnValue(Promise.resolve({ id: v4() }));
User.update.mockReturnValue(Promise.resolve(defaultUser));

beforeEach(() => {
    User.mockReset();
});

describe('userService', () => {
    describe('get()', () => {
        it('should return object', async () => {
            const userId = v4();
            const user = await userService.get(userId);

            expect(user.id).toBe(defaultUser.id);
            expect(user.age).toBe(defaultUser.age);
            expect(user.login).toBe(defaultUser.login);
            expect(User.findOne).toBeCalledTimes(1);
        });

        it('should return null if user not found', async () => {
            User.findOne.mockReturnValueOnce(Promise.resolve(null));

            const userId = v4();
            const user = await userService.get(userId);

            expect(user).toBeNull();
            expect(User.findOne).toBeCalledTimes(1);
        });
    });

    describe('create()', () => {
        it('should return ID of created user', async () => {
            const userId = await userService.create({
                age: 44,
                login: 'example@example.com',
                password: 'veryStrongPassword1111',
            });

            expect(typeof userId).toBe('string');
            expect(User.create).toBeCalledTimes(1);
        });
    });

    describe('del()', () => {
        it('should throw error if user not found', () => {
            User.findOne.mockReturnValueOnce(Promise.resolve(null));

            const userId = v4();
            const response = userService.del(userId);

            expect(response).rejects.toThrow(Error);
            expect(response).rejects.toThrow(`Failed to delete user ${userId}.`);
            expect(User.findOne).toBeCalledTimes(1);
            expect(User.update).toBeCalledTimes(0);
        });
    });

    describe('update()', () => {
        it('should return object of updated user', async () => {
            const updatedUser = await userService.update({
                id: v4(),
                age: 25,
                login: 'example@example.com',
                password: 'veryStrongPassword1111'
            });

            expect(updatedUser.age).toBe(25);
            expect(updatedUser.login).toBe('example@example.com');
            expect(User.findOne).toBeCalledTimes(1);
        });

        it('should throw error if user not found', async () => {
            User.findOne.mockReturnValueOnce(Promise.resolve(null));

            const id = v4();
            const response = userService.update({
                id,
                age: 25,
                login: 'example@example.com',
                password: 'veryStrongPassword1111'
            });

            expect(response).rejects.toThrow(Error);
            expect(response).rejects.toThrow(`Failed to update user "${id}".`);
            expect(User.update).toBeCalledTimes(0);
            expect(User.findOne).toBeCalledTimes(1);
        });
    });
});
