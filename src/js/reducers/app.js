import storageService from "../services/storage";
import util from "../util";

let ActionTypes = require('../actions/types');
let wayPoints = require('./way-points');
let wayPoint = require('./way-point');
let routes = require('./routes');
let route = require('./route');

let savedState = util.transformSavedState(storageService.get('appState'));

let defaultRoutes = routes(undefined, ActionTypes.ADD_ROUTE);
let activeRouteID = defaultRoutes.first().id;
let DEFAULTS = {
    activeRouteID: activeRouteID,
    routes: defaultRoutes
};

const app = (state = savedState || DEFAULTS, action) => {

    switch (action.type) {
        case ActionTypes.ADD_ROUTE:
            return Object.assign({}, state, {
                routes: routes(state.routes, action)
            });
        case ActionTypes.CHANGE_ACTIVE_ROUTE:
            return Object.assign({}, state, {
                activeRouteID: action.id
            });
        case ActionTypes.ADD_WAY_POINT_TO_ROUTE:
        case ActionTypes.REMOVE_WAY_POINT_FROM_ROUTE:
            return Object.assign({}, state, {
                routes: state.routes.map((r) => {
                    if (r.id === state.activeRouteID) {
                        return route(r, action);
                    }
                    return r;
                })
            });
        case ActionTypes.API_FETCH_ROUTES_SUCCEEDED:
        case ActionTypes.CHANGE_ROUTE_NAME:
            return Object.assign({}, state, {
                routes: state.routes.map((r) => {
                    if (r.id === action.routeID) {
                        return route(r, action);
                    }
                    return r;
                })
            });

        case ActionTypes.ADD_WAY_POINT:
        case ActionTypes.REMOVE_WAY_POINT:
            return Object.assign({}, state, {
                wayPoints: wayPoints(state.wayPoints, action)
            });
        case ActionTypes.OPEN_WAY_POINT_DETAILS:
        case ActionTypes.CLOSE_WAY_POINT_DETAILS:
        case ActionTypes.CHANGE_WAY_POINT_NAME:
            return Object.assign({}, state, {
                wayPoints: state.wayPoints.map((wp) => {
                    if (wp.id === action.wayPointID) {
                        return wayPoint(wp, action);
                    }
                    return wp;
                })
            });
        case ActionTypes.SET_EDITING_WAY_POINT:
            return Object.assign({}, state, {
                editingWayPoint: action.wayPointID
            });
        case ActionTypes.UNSET_EDITING_WAY_POINT:
            return Object.assign({}, state, {
                editingWayPoint: undefined
            });
        case ActionTypes.REFRESH_MAP:
            return Object.assign({}, state, {
                mapData: action.data
            });
        default:
            return state;
    }
}

module.exports = app;