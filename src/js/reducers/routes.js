let Immutable = require('immutable');
let ActionTypes = require('../actions/types');
let Actions = require('../actions');
let route = require('./route');

let DEFAULTS = Immutable.List.of(route(undefined, Actions.addRoute(0)));

const routes = (state = DEFAULTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ROUTE:
            return state.push(route(undefined, action));
        case  ActionTypes.ADD_WAY_POINT_TO_ROUTE:
            return state;
        default:
            return state;
    }

};

module.exports = routes;