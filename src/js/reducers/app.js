var ActionTypes = require('../actions/types');
var wayPoints = require('./way-points');
var routes = require('./routes');

var DEFAULTS = {
    routes: routes(undefined, ActionTypes.ADD_ROUTE)
};

const app = (state = DEFAULTS, action) => {

    switch (action.type) {

        case ActionTypes.ADD_ROUTE:
            return Object.assign({}, state, {
                routes: routes(state.routes, action)
            });
            break;
        case ActionTypes.ADD_WAY_POINT:
            return Object.assign({}, state, {
                wayPoints: wayPoints(state.wayPoints, action)
            });
            break;
        default:
            return Object.assign({}, state, {
                wayPoints: wayPoints(state.wayPoints, action)
            });
    }
}

module.exports = app;