var ActionTypes = require('../actions/types');
var util = require('../util');
var Immutable = require('immutable');

const route = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_ROUTE:
            return {
                id: util.guid(),
                name: 'New Route',
                wayPoints: Immutable.List()
            };
        case ActionTypes.ADD_WAY_POINT_TO_ROUTE:
            let wayPoints = state.wayPoints;
            let pos = wayPoints.findIndex((wp)=> wp === action.tgtWayPoint);
            if (pos === -1) {
                wayPoints = wayPoints.push(action.newWayPoint);
            } else {
                wayPoints = wayPoints.insert(pos + 1, action.newWayPoint);
            }
            return Object.assign({}, state, {
                wayPoints: wayPoints
            });
        case ActionTypes.REMOVE_WAY_POINT_FROM_ROUTE:
            return Object.assign({}, state, {
                wayPoints: state.wayPoints.filter((wp)=> {
                    return wp !== action.wayPointID;
                })
            });
        case ActionTypes.CHANGE_ROUTE_NAME:
            return Object.assign({}, state, {
                name: action.newName
            });
        case ActionTypes.API_FETCH_ROUTES_SUCCEEDED:
            return Object.assign({}, state, {
                directions: action.routes
            });
        default:
            return state;
    }
};

module.exports = route;