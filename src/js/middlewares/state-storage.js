import storage from "../services/storage";

let DB_NAME = "appState";

let stateStorage = ({getState}) => next => action => {
    let returnVal = next(action);
    if (action.saveState) {
        storage.set(DB_NAME, JSON.stringify(getState()));
    }
    return returnVal;
};

let createStorageMiddleware = (dbName) => {
    DB_NAME = dbName;
    return stateStorage;
};
export default createStorageMiddleware;