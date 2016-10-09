var ActionTypes = require('../actions/types');
var util = require('../util');

const wayPoint = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_WAY_POINT:
            return {
                id: util.guid(),
                name: 'Enter a way point'
            };
        case ActionTypes.CHANGE_WAY_POINT_NAME:
            return Object.assign({}, state, {
                name: action.newName
            });
        default:
            return state;
    }
};

module.exports = wayPoint;