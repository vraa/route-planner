var ActionTypes = require('../actions/types');
var Actions = require('../actions');
var route = require('./route');

var DEFAULTS = [
    route(undefined, Actions.addRoute(0))
]

const routes = (state = DEFAULTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ROUTE:
            return [
                ...state,
                route(undefined, action)
            ];
        default:
            return state;
    }

};

module.exports = routes;