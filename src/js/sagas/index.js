import {takeEvery} from "redux-saga";
import {select, put, call} from "redux-saga/effects";
let Actions = require('../actions');
let ActionTypes = require('../actions/types');
let AppSelectors = require('../selectors/app');
let APIService = require('../services/api');

function* addRoute() {
    yield put(Actions.addRoute());
    let newRoute = yield select(AppSelectors.recentlyAddedRoute);
    yield put(Actions.changeActiveRoute(newRoute.id));
}

function* addWayPoint(action) {
    yield put(Actions.addWayPoint(action.id));
    let newWayPoint = yield select(AppSelectors.recentlyAddedWayPoint);
    yield put(Actions.addWayPointToRoute(action.id, newWayPoint.id));
    yield put(Actions.setEditingWayPoint(newWayPoint.id));
}

function* removeWayPoint(action) {
    yield put(Actions.removeWayPointFromRoute(action.id));
    yield put(Actions.removeWayPoint(action.id));
    yield* fetchDirections(action);
}

function* fetchDirections(action) {
    let activeRouteID = yield select(AppSelectors.activeRouteID);
    let activeWayPoints = yield select(AppSelectors.activeWayPoints);
    let data = yield call(APIService.fetchRoutes, activeWayPoints, action.mapService);
    if (data && data.status === 'OK') {
        yield put(Actions.API.fetchRoutesSucceeded(activeRouteID, data.response.routes));
        yield put(Actions.refreshMap(data.response));
    } else {
        console.log('fetch direction failed', data && data.status);
    }
}

function* changeWayPointName(action) {
    yield put(Actions.changeWayPointName(action.wayPointID, action.newName));
    yield put(Actions.unsetEditingWayPoint());
    if (action.newName.trim() === '') {
        yield* removeWayPoint(Actions.removeWayPointRequested(action.wayPointID));
    }
    yield* fetchDirections(action);
}

function* rootSaga() {
    yield* [
        takeEvery(ActionTypes.LOAD_MAP, fetchDirections),
        takeEvery(ActionTypes.ADD_ROUTE_REQUESTED, addRoute),
        takeEvery(ActionTypes.ADD_WAY_POINT_REQUESTED, addWayPoint),
        takeEvery(ActionTypes.REMOVE_WAY_POINT_REQUESTED, removeWayPoint),
        takeEvery(ActionTypes.CHANGE_WAY_POINT_NAME_REQUESTED, changeWayPointName)
    ];

}

module.exports = rootSaga;

