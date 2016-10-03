var ActionTypes = require('../actions/types');
var wayPoints = require('./way-points');

var st = {
    meta: 'data',
    routes: [
        {
            id: 1,
            name: 'Route 1',
            wayPoints: [1, 2, 3]
        },
        {
            id: 2,
            name: 'Route 2',
            wayPoints: []
        }
    ],
    wayPoints: [
        {
            id: 1,
            name: 'Way Point 1'
        },
        {
            id: 2,
            name: 'Way Point 2'
        }
    ]
};

const app = (state = {}, action) => {

    switch (action.type) {

        case ActionTypes.ADD_WAY_POINT:
            return Object.assign({}, state, {
                wayPoints: wayPoints(state.wayPoints, action)
            });
            break;
        default:
            return Object.assign({}, state, {
                wayPoints: wayPoints(state.wayPoints, action)
            });
    }
}

module.exports = app;