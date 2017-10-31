import * as R from 'ramda';

export const path =
    ( data ) =>
    ( path ) => R.flip( R.path )( data, path.split('.') );
