import {takeEvery} from "redux-saga";
import {select, put} from "redux-saga/effects";
let Actions = require('../actions');
let ActionTypes = require('../actions/types');
let AppSelectors = require('../selectors/app');

function* addWayPoint(action) {
    yield put(Actions.addWayPoint(action.id));
    let newWayPoint = yield select(AppSelectors.recentlyAddedWayPoint);
    yield put(Actions.addWayPointToRoute(action.id, newWayPoint.id));
}

function* rootSaga() {
    yield* takeEvery(ActionTypes.ADD_WAY_POINT_REQUESTED, addWayPoint);
}

module.exports = rootSaga;

