var React = require('react');

var EditWayPoint = React.createClass({
    componentDidMount: function () {
        var node = this.refs['wayPoint'].getDOMNode(),
            google = this.props.mapService;
        this.autoComplete = new google.maps.places.Autocomplete(node);
        google.maps.event.addListener(this.autoComplete, 'place_changed', this.onPlaceChange);
        node.focus();
    },
    onPlaceChange: function () {
        var place = this.autoComplete.getPlace();
        this.props.onAction('save', {
            value: place.formatted_address
        });
    },
    onDone: function (e) {
        e.preventDefault();
        this.save(this.refs['wayPoint'].getDOMNode().value);
    },
    onCancel: function (e) {
        e.preventDefault();
        this.props.onAction('cancel');
    },
    onBlur: function (e) {
        this.save(e.target.value);
    },
    save: function (newValue) {
        if (!!newValue) {
            this.props.onAction('save', {
                value: newValue
            });
        } else {
            alert('Location is required.');
            this.refs['wayPoint'].getDOMNode().focus();
        }
    },
    render: function () {
        return (
            <div className='editing'>
                <input ref='wayPoint' type='text' name='wayPoint' defaultValue={this.props.name} onBlur={this.onBlur} />
                <ul className='actions'>
                    <li>
                        <a title='Save' href='#' onClick={this.onDone}>
                            <i className='icon-done'></i>
                        </a>
                    </li>
                    <li>
                        <a title='Cancel' href='#' onClick={this.onCancel}>
                            <i className='icon-undo'></i>
                        </a>
                    </li>
                </ul>
            </div>
            );
    }
});

var ViewWayPoint = React.createClass({
    edit: function () {
        this.props.onAction('edit');
    },
    add: function (e) {
        e.preventDefault();
        this.props.onAction('add');
    },
    remove: function (e) {
        e.preventDefault();
        this.props.onAction('remove');
    },
    render: function () {
        var name = this.props.name;
        return (
            <div className='viewing'>
                <p className='way-point-name' onClick={this.edit}>
                {name}
                </p>
                <ul className='actions'>
                    <li>
                        <a title='Add a new location next' href='#' onClick={this.add}>
                            <i className='icon-add'></i>
                        </a>
                    </li>
                    <li>
                        <a title='Remove this location' href='#' onClick={this.remove}>
                            <i className='icon-clear'></i>
                        </a>
                    </li>
                </ul>
            </div>
            );
    }
});

var WayPoint = React.createClass({
    render: function () {
        var wayPoint = this.props.wayPoint,
            name = wayPoint.get('name'),
            editing = this.props.editing,
            element = null;
        if (editing) {
            element = (<EditWayPoint
            mapService={this.props.mapService}
            name={name}
            onAction={this.props.onAction} />);
        } else {
            element = (<ViewWayPoint
            name={name}
            onAction={this.props.onAction}
            />);
        }
        return (
            <div className='way-point'>
                <i className='marker icon-adjust'/>
            {element}
            </div>
            );
    }
});

module.exports = WayPoint;