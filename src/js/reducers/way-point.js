var ActionTypes = require('../actions/types');
var util = require('../util');

const wayPoint = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_WAY_POINT:
            return {
                id: util.guid(),
                name: 'Enter a way point'
            };
            break;
        default:
            return state;
    }
};

module.exports = wayPoint;