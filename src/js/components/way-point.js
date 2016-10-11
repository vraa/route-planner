var React = require('react');
var EditableText = require('./core/editable-text');
var Link = require('./core/link');

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
                    edit={this.props.edit}
                    placeholder="Start typing a place name"
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
                <div className="cta">
                    <Link onClick={this.props.onAdd}><i className="icon-plus"></i></Link>
                    <Link onClick={this.props.onRemove}><i className="icon-minus"></i></Link>
                </div>
            </div>
        )
    }
}

module.exports = WayPoint;