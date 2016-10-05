var React = require('react');
var EditableText = require('./core/editable-text');
var RouteInfo = require('./route-info');
var WayPoints = require('../containers/way-points');

class Route extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'route'}>
                <EditableText value={''}/>
                <RouteInfo/>
                <WayPoints/>
            </div>
        )

    }
}

module.exports = Route;