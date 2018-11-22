import PropTypes from 'prop-types';


export const PropTypesAuth = PropTypes.shape({
    access_token: PropTypes.string,
    refresh_token: PropTypes.string,
    token_type: PropTypes.string,
});

export const PropTypesUser = PropTypes.shape({
    id: PropTypes.number,
    active: PropTypes.bool,
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

export const PropTypesTextField = {
    label: PropTypes.string,
    name: PropTypes.string,
    validate: PropTypes.func,
};


export default {
    user: PropTypesUser,
};
