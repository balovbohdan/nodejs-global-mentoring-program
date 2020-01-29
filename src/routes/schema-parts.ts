import * as Joi from '@hapi/joi';

export const login = () => Joi.string().email();
export const age = () => Joi.number().integer().min(4).max(130);
export const id = () => Joi.string().guid({ version: 'uuidv4' });

export const password = () => (
    Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/, 'password')
);
