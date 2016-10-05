var ActionTypes = require('./types');

var Actions = {

    addRoute: (id) => {
        return {
            type: ActionTypes.ADD_ROUTE,
            id: id
        }
    },

    removeRoute: (id) => {
        return {
            type: ActionTypes.REMOVE_ROUTE,
            id: id
        }
    },

    changeActiveRoute: (id) => {
        return {
            type: ActionTypes.CHANGE_ACTIVE_ROUTE,
            id: id
        }
    },

    addWayPoint: (id) => {
        return {
            type: ActionTypes.ADD_WAY_POINT,
            id: id
        }
    },

    removeWayPoint: (id) => {
        return {
            type: ActionTypes.REMOVE_WAY_POINT,
            id: id
        }
    }

};

module.exports = Actions;