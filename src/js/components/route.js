var React = require('react');
var EditableText = require('./core/editable-text');
var RouteInfo = require('./route-info');
var WayPoint = require('./way-point');

class Route extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={'route'}>
                <EditableText value={'Route Name'}/>
                <RouteInfo/>
                <div className="way-points">
                    <WayPoint/>
                </div>
            </div>
        )

    }
}

module.exports = Route;