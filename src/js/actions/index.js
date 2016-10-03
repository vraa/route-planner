var ActionTypes = require('./types');

var Actions = {

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