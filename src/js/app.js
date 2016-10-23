import createSagaMiddleware from "redux-saga";

let React = require('react');
let {Provider} = require('react-redux');
let {createStore, applyMiddleware, compose} = require('redux');
let appReducer = require('./reducers/app');
let Routes = require('./containers/routes');

let rootSagas = require('./sagas');
let APIService = require('./services/api');

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSagas);

class App extends React.Component {

    componentWillMount() {
        APIService.initMapService(this.props.mapService);
    }

    render() {
        return (
            <Provider store={store}>
                <div className="route-planner">
                    <header>
                        <h1>Route Planner</h1>
                        <ul>
                            <li>
                                <a href="https://github.com/vraa/route-planner">Source</a>
                            </li>
                            <li>
                                Built by  <a href="http://veerasundar.com">Veera</a>
                            </li>
                        </ul>
                    </header>
                    <Routes mapService={this.props.mapService}/>
                </div>
            </Provider>
        )
    }
}

module.exports = App;