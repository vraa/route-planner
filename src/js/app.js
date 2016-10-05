var React = require('react');
var {Provider} = require('react-redux');
var {createStore} = require('redux');
var appReducer = require('./reducers/app');

var Routes = require('./containers/routes');

let store = createStore(appReducer);


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