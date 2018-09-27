import * as R from 'ramda';
import { saveAs } from 'file-saver';


export const save_response =
    R.curry(
        ({ filename, response }) => (
            response
                .blob()
                .then((blob) => saveAs(blob, filename))
        )
    );

export default {
    response: save_response,
};
