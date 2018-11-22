import fp from 'lodash/fp';


export { default as PageUser } from './user';
export { default as PageUsers } from './users';

export const getName = fp.pipe(fp.at(['lastName', 'firstName']), fp.compact, fp.join(' '));
