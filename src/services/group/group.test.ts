import { v4 } from 'uuid';

import { Group } from '#models';

import groupService from '.';

const mockedId = 'mockedV4uuid';

jest.mock('#models/group/Group');
jest.mock('uuid', () => ({
    v4: () => 'mockedV4uuid',
}));

const defaultGroup = {
    id: v4(),
    name: 'testGroup',
    permissions: ['READ']
};

Group.findOne.mockReturnValue(Promise.resolve(defaultGroup));
Group.create.mockReturnValue(Promise.resolve({ id: v4() }));

Group.update.mockResolvedValueOnce(null);

beforeEach(() => {
    Group.mockReset();
});

describe('groupService', () => {
    describe('get()', () => {
        it('should return object', async () => {
            const id = v4();
            const group = await groupService.get({
                where: { id }
            });

            expect(group).toBe(defaultGroup);
            expect(Group.findOne).toBeCalledTimes(1);
            expect(group).toBe(defaultGroup);
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

            expect(groupId).toBe(mockedId);
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

            expect(updatedGroup).toBe(defaultGroup);
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
