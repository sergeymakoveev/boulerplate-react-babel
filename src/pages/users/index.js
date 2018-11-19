import fp from 'lodash/fp';


export { default as PageUser } from './user';
export { default as PageUsers } from './users';

export const getName = (...args) => fp.pipe(fp.compact, fp.join(' '))(args);
