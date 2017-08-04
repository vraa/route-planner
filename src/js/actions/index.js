var ActionTypes = require('./types');

const saveState = true;

var Actions = {

    addRoute: () => {
        return {
            type: ActionTypes.ADD_ROUTE,
            saveState
        }
    },

    addRouteRequested: () => {
        return {
            type: ActionTypes.ADD_ROUTE_REQUESTED,
        }
    },

    removeRoute: (id) => {
        return {
            type: ActionTypes.REMOVE_ROUTE,
            id,
            saveState
        }
    },

    removeRouteRequested: (id) => {
        return {
            type: ActionTypes.REMOVE_ROUTE_REQUESTED,
            id
        }
    },

    changeActiveRoute: (id) => {
        return {
            type: ActionTypes.CHANGE_ACTIVE_ROUTE,
            id
        }
    },

    changeRouteName: (routeID, newName) => {
        return {
            type: ActionTypes.CHANGE_ROUTE_NAME,
            routeID,
            newName
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
            id,
            saveState
        }
    },

    removeWayPointRequested: (id) => {
        return {
            type: ActionTypes.REMOVE_WAY_POINT_REQUESTED,
            id
        }
    },

    changeWayPointName: (wayPointID, newName) => {
        return {
            type: ActionTypes.CHANGE_WAY_POINT_NAME,
            wayPointID,
            newName,
            saveState
        }
    },

    changeWayPointNameRequested: (wayPointID, newName, mapService) => {
        return {
            type: ActionTypes.CHANGE_WAY_POINT_NAME_REQUESTED,
            wayPointID,
            newName,
            mapService
        }
    },

    setEditingWayPoint: (wayPointID) => {
        return {
            type: ActionTypes.SET_EDITING_WAY_POINT,
            wayPointID
        }
    },

    unsetEditingWayPoint: () => {
        return {
            type: ActionTypes.UNSET_EDITING_WAY_POINT
        }
    },

    openWayPointDetails: (wayPointID) => {
        return {
            type: ActionTypes.OPEN_WAY_POINT_DETAILS,
            wayPointID
        }
    },

    closeWayPointDetails: (wayPointID) => {
        return {
            type: ActionTypes.CLOSE_WAY_POINT_DETAILS,
            wayPointID
        }
    },

    refreshMap: (data) => {
        return {
            type: ActionTypes.REFRESH_MAP,
            data
        }
    },

    loadMap: () => {
        return {
            type: ActionTypes.LOAD_MAP
        }
    },

    API: {
        fetchRoutes: () => {
            return {
                type: ActionTypes.API_FETCH_ROUTES
            }
        },

        fetchRoutesSucceeded: (routeID, routes) => {
            return {
                type: ActionTypes.API_FETCH_ROUTES_SUCCEEDED,
                routeID,
                routes,
                saveState
            }
        }

    }

};

module.exports = Actions;