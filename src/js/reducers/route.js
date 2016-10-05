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
            }
        default:
            return state;
    }
};

module.exports = route;