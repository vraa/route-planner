import React from 'react';
import createSagaMiddleware from "redux-saga";
import createStorageMiddleware from "./middlewares/state-storage";
import Actions from "./actions";

let {Provider} = require('react-redux');
let {createStore, applyMiddleware, compose} = require('redux');
let appReducer = require('./reducers/app');
let Routes = require('./containers/routes');

let rootSagas = require('./sagas');
let APIService = require('./services/api');

const TOTAL_BACKGROUND_IMAGES = 12;
const DB_NAME = 'appState';

const sagaMiddleware = createSagaMiddleware();
const storageMiddleware = createStorageMiddleware(DB_NAME);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, storageMiddleware))
);
sagaMiddleware.run(rootSagas);

class App extends React.Component {

    componentWillMount() {
        APIService.initMapService(this.props.mapService);
        this.loadBackground = this.loadBackground.bind(this);
        this.applyBackground = this.applyBackground.bind(this);
    }

    componentDidMount() {
        this.loadBackground();
        store.dispatch(Actions.loadMap());
    }

    loadBackground() {
        let img = new Image();
        let location = window.location;
        let randomBg = Math.floor(Math.random() * (TOTAL_BACKGROUND_IMAGES - 1 + 1)) + 1;
        img.onload = () => {
            this.applyBackground(img);
        };
        img.src = `${location.protocol}//${location.hostname}${location.pathname}/img/bg${randomBg}.jpg`;
    }

    applyBackground(img) {
        let elm = document.querySelector('.app');
        elm.style.backgroundImage = `url(${img.src})`;
    }

    render() {
        return (
            <Provider store={store}>
                <div className="route-planner">
                    <Routes mapService={this.props.mapService}/>
                </div>
            </Provider>
        )
    }
}

module.exports = App;