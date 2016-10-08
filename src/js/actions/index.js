var ActionTypes = require('./types');

var Actions = {

    addRoute: (id) => {
        return {
            type: ActionTypes.ADD_ROUTE,
            id
        }
    },

    removeRoute: (id) => {
        return {
            type: ActionTypes.REMOVE_ROUTE,
            id
        }
    },

    changeActiveRoute: (id) => {
        return {
            type: ActionTypes.CHANGE_ACTIVE_ROUTE,
            id
        }
    },

    addWayPointToRoute: (tgtWayPoint, newWayPoint) => {
        return {
            type: ActionTypes.ADD_WAY_POINT_TO_ROUTE,
            tgtWayPoint,
            newWayPoint
        }
    },

    removeWayPointFromRoute: (wayPointID) => {
        return {
            type: ActionTypes.REMOVE_WAY_POINT_FROM_ROUTE,
            wayPointID
        }
    },

    addWayPoint: (id) => {
        return {
            type: ActionTypes.ADD_WAY_POINT,
            id
        }
    },

    addWayPointRequested: (id) => {
        return {
            type: ActionTypes.ADD_WAY_POINT_REQUESTED,
            id
        }
    },

    removeWayPoint: (id) => {
        return {
            type: ActionTypes.REMOVE_WAY_POINT,
            id
        }
    },

    removeWayPointRequested: (id) => {
        return {
            type: ActionTypes.REMOVE_WAY_POINT_REQUESTED,
            id
        }
    }

};

module.exports = Actions;