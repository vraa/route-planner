var React = require('react');
var EditableText = require('./components/core/editable-text');
var {Provider} = require('react-redux');
var {createStore} = require('redux');
var appReducer = require('./reducers/app');

let store = createStore(appReducer);


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="route-planner">
                    <EditableText value="new text"/>
                </div>
            </Provider>
        )
    }
}

module.exports = App;