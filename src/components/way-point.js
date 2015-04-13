var React = require('react');

var EditWayPoint = React.createClass({
    save: function (e) {
        this.props.onAction('save', {
            value: e.target.value
        });
    },
    render: function () {
        return (
            <div className='editing'>
                <input type='text' name='wayPoint' defaultValue={this.props.name} onBlur={this.save} />
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
                <p onClick={this.edit}>{name}</p>
                <ul>
                    <li>
                        <a href='#' onClick={this.add}>Add</a>
                    </li>
                    <li>
                        <a href='#' onClick={this.remove}>Remove</a>
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
            {element}
            </div>
            );
    }
});

module.exports = WayPoint;