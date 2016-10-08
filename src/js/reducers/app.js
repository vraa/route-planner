let AppSelectors = require('../selectors/app');
let Actions = require('../actions');
let ActionTypes = require('../actions/types');
let wayPoints = require('./way-points');
let routes = require('./routes');
let route = require('./route');

let defaultRoutes = routes(undefined, ActionTypes.ADD_ROUTE);
let activeRouteID = defaultRoutes.first().id;
let DEFAULTS = {
    activeRouteID: activeRouteID,
    routes: defaultRoutes
};

const app = (state = DEFAULTS, action) => {

    switch (action.type) {
        case ActionTypes.ADD_ROUTE:
            return Object.assign({}, state, {
                routes: routes(state.routes, action)
            });

        case ActionTypes.ADD_WAY_POINT_TO_ROUTE:
            return Object.assign({}, state, {
                routes: state.routes.map((r)=> {
                    if (r.id === state.activeRouteID) {
                        return route(r, action);
                    }
                    return r;
                })
            });
        case ActionTypes.REMOVE_WAY_POINT_FROM_ROUTE:
            return Object.assign({}, state, {
                routes: state.routes.map((r)=> {
                    if(r.id === state.activeRouteID) {
                        return route(r, action);
                    }
                    return r;
                })
            });
        case ActionTypes.ADD_WAY_POINT:
            return Object.assign({}, state, {
                wayPoints: wayPoints(state.wayPoints, action)
            });
        case ActionTypes.REMOVE_WAY_POINT:
            return Object.assign({}, state, {
                wayPoints: wayPoints(state.wayPoints, action)
            });

        default:
            return state;
    }
}

module.exports = app;