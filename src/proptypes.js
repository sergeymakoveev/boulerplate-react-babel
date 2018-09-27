import PropTypes from 'prop-types';


export const PropTypesUser = PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
});

export const PropTypesUsers = PropTypes.arrayOf(PropTypesUser);

export const PropTypesRoute = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
};

export const PropTypesChildren = (
    PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired
);

export default {
    user: PropTypesUser,
};
