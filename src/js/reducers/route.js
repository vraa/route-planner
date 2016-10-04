var ActionTypes = require('../actions/types');
var util = require('../util');
const route = (state = {}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_ROUTE:
            return {
                id: util.guid(),
                name: 'New Route'
            }
        default:
            return state;
    }
};

module.exports = route;