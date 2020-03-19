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

User.findOne.mockReturnValue(
    Promise.resolve({
        ...defaultUser,
        async get() {
            return defaultUser;
        },
        async update() {}
    })
);

User.create.mockReturnValue(
    Promise.resolve({
        id: v4()
    })
);

User.update.mockReturnValue(Promise.resolve(defaultUser));

beforeEach(() => {
    User.mockReset();
});

describe('userService', () => {
    describe('get()', () => {
        it('should return object', async () => {
            const userId = v4();
            const user = await userService.get(userId);

            expect(typeof user).toBe('object');
        });

        it('should return null if user not found', async () => {
            User.findOne.mockReturnValueOnce(Promise.resolve(null));

            const userId = v4();
            const user = await userService.get(userId);

            expect(user).toBe(null);
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
        });
    });

    describe('del()', () => {
        it('should throw error if user not found', () => {
            User.findOne.mockReturnValueOnce(Promise.resolve(null));

            const userId = v4();
            const response = userService.del(userId);

            expect(response).rejects.toThrow(Error);
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

            expect(typeof updatedUser).toBe('object');
        });

        it('should throw error if user not found', async () => {
            User.findOne.mockReturnValueOnce(Promise.resolve(null));

            const response = userService.update({
                id: v4(),
                age: 25,
                login: 'example@example.com',
                password: 'veryStrongPassword1111'
            });

            expect(response).rejects.toThrow(Error);
        });
    });
});
