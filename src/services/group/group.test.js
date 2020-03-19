import { v4 } from 'uuid';

import { Group } from '#models';
import * as groupConstants from '#models/group/constants';

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
        });

        it('should return null if group not found', async () => {
            Group.findOne.mockReturnValueOnce(Promise.resolve(null));

            const group = await groupService.get({
                where: {
                    id: v4()
                }
            });
        });
    });

    describe('create()', () => {
        it('should return ID of created group', async () => {
            const groupId = await groupService.create({
                name: 'testGroup',
                permissions: ['READ', 'WRITE']
            });

            expect(typeof groupId).toBe('string');
        });
    });

    describe('update()', () => {
        it('should return object of updated group', async () => {
            const updatedGroup = await groupService.update({
                id: v4(),
                name: 'udatedTestGroup',
                permissions: ['READ']
            });

            expect(typeof updatedGroup).toBe('object');
        });

        it('should throw error if group not found', async () => {
            Group.findOne.mockReturnValueOnce(Promise.resolve(null));

            const response = groupService.update({
                id: v4(),
                name: 'updatedTestGroup',
                permissions: ['READ']
            });

            expect(response).rejects.toThrow(Error);
        });
    });
});
