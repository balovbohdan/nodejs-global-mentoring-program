import { v4 } from 'uuid';

import { Group } from '#models';

import groupService from '.';

jest.mock('#models/group/Group');

Group.findOne.mockReturnValue(
    Promise.resolve({
        id: v4(),
        name: 'testGroup',
        permissions: ['READ']
    })
);

Group.create.mockReturnValue(
    Promise.resolve({
        id: v4()
    })
);

Group.update.mockResolvedValueOnce(null);

beforeEach(() => {
    Group.mockReset();
});

describe('groupService', () => {
    describe('get()', () => {
        it('should return object', async () => {
            const group = await groupService.get({
                where: {
                    id: v4()
                }
            });

            expect(typeof group).toBe('object');
            expect(Group.findOne).toBeCalledTimes(1);
        });

        it('should return null if group not found', async () => {
            Group.findOne.mockReturnValueOnce(Promise.resolve(null));

            const group = await groupService.get({
                where: {
                    id: v4()
                }
            });

            expect(group).toBeNull();
            expect(Group.findOne).toBeCalledTimes(1);
        });
    });

    describe('create()', () => {
        it('should return ID of created group', async () => {
            const groupId = await groupService.create({
                name: 'testGroup',
                permissions: ['READ', 'WRITE']
            });

            expect(typeof groupId).toBe('string');
            expect(Group.create).toBeCalledTimes(1);
        });
    });

    describe('update()', () => {
        it('should return object of updated group', async () => {
            const id = v4();
            const updatedGroup = await groupService.update({
                id,
                name: 'updatedTestGroup',
                permissions: ['READ']
            });

            expect(typeof updatedGroup).toBe('object');
            expect(Group.update).toBeCalledTimes(1);
            expect(Group.findOne).toBeCalledTimes(1);
        });

        it('should throw error if group not found', async () => {
            Group.findOne.mockReturnValueOnce(Promise.resolve(null));

            const id = v4();
            const response = groupService.update({
                id,
                name: 'updatedTestGroup',
                permissions: ['READ']
            });

            expect(response).rejects.toThrow(Error);
            expect(response).rejects.toThrow('Failed to find updated group.');
            expect(Group.update).toBeCalledTimes(1);
        });
    });
});
