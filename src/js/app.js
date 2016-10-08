import createSagaMiddleware from 'redux-saga';

let React = require('react');
let {Provider} = require('react-redux');
let {createStore, applyMiddleware} = require('redux');
let appReducer = require('./reducers/app');
let Routes = require('./containers/routes');

let rootSagas = require('./sagas');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="route-planner">

                    <Routes/>

                </div>
            </Provider>
        )
    }
}

module.exports = App;