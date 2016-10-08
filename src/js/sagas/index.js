import {takeEvery} from "redux-saga";
import {select, put} from "redux-saga/effects";
let Actions = require('../actions');
let ActionTypes = require('../actions/types');
let AppSelectors = require('../selectors/app');

function* addRoute(action) {
    yield put(Actions.addRoute());
    let newRoute = yield select(AppSelectors.recentlyAddedRoute);
    yield put(Actions.changeActiveRoute(newRoute.id));
}

function* addWayPoint(action) {
    yield put(Actions.addWayPoint(action.id));
    let newWayPoint = yield select(AppSelectors.recentlyAddedWayPoint);
    yield put(Actions.addWayPointToRoute(action.id, newWayPoint.id));
}

function* removeWayPoint(action) {
    yield put(Actions.removeWayPointFromRoute(action.id));
    yield put(Actions.removeWayPoint(action.id));
}

function* rootSaga() {
    yield* [
        takeEvery(ActionTypes.ADD_ROUTE_REQUESTED, addRoute),
        takeEvery(ActionTypes.ADD_WAY_POINT_REQUESTED, addWayPoint),
        takeEvery(ActionTypes.REMOVE_WAY_POINT_REQUESTED, removeWayPoint)
    ];

}

module.exports = rootSaga;

