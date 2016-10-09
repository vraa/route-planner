var React = require('react');
var EditableText = require('./core/editable-text');

class WayPoint extends React.Component {

    componentDidMount() {
    }

    cacheWayPointDomElm(elm) {
        let google = this.props.mapService;
        if (elm) {
            new google.maps.places.Autocomplete(elm);
        }
    }

    handleWayPointNameChange(newName) {
        this.props.onNameChange(this.props.wayPoint.id, newName);
    }

    renderWayPointName() {
        return (
            <div className="way-point-name">
                <EditableText
                    domElm={this.cacheWayPointDomElm.bind(this)}
                    onSave={this.handleWayPointNameChange.bind(this)}
                    value={this.props.wayPoint.name}/>
            </div>
        )
    }

    render() {
        return (
            <div className="way-point">
                {this.renderWayPointName()}
                <button onClick={this.props.onAdd}>add</button>
                <button onClick={this.props.onRemove}>delete</button>
            </div>
        )
    }
}

module.exports = WayPoint;