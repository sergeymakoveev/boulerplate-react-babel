import fp from 'lodash/fp';


const getName = fp.pipe(fp.at(['lastName', 'firstName']), fp.compact, fp.join(' '));

export default { getName };
