var React = require('react');
var EditableText = require('./core/editable-text');
var Link = require('./core/link');

class WayPoint extends React.Component {

    componentDidMount() {
    }

    componentWillUnmount() {
        this.autoComplete = null;
    }

    cacheWayPointDomElm(elm) {
        let google = this.props.mapService;
        if (elm) {
            this.autoComplete = new google.maps.places.Autocomplete(elm);
            this.autoComplete.addListener('place_changed', this.autoCompletePlaceChange.bind(this));
        }
    }

    handleWayPointNameChange(newName) {
        this.props.onNameChange(this.props.wayPoint.id, newName);
    }

    autoCompletePlaceChange() {
        this.handleWayPointNameChange(this.autoComplete.getPlace().formatted_address);
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
                    <Link className='insert-way-point' onClick={this.props.onAdd}><i className="icon-plus"></i></Link>
                    <Link className='remove-way-point' onClick={this.props.onRemove}><i className="icon-minus"></i></Link>
                </div>
            </div>
        )
    }
}

module.exports = WayPoint;