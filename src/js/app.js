var React = require('react');
var {Provider} = require('react-redux');
var {createStore} = require('redux');
var appReducer = require('./reducers/app');

var Route = require('./components/route');

let store = createStore(appReducer);


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="route-planner">

                    <Route/>

                </div>
            </Provider>
        )
    }
}

module.exports = App;