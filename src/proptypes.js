import PropTypes from 'prop-types';

export const PropTypesUser = PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
});

export default {
    user: PropTypesUser
};
