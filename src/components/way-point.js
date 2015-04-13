var React = require('react');

var EditWayPoint = React.createClass({
    componentDidMount: function () {
        this.refs['wayPoint'].getDOMNode().focus();
    },
    onDone: function (e) {
        e.preventDefault();
        this.props.onAction('save', {
            value: this.refs['wayPoint'].getDOMNode().value
        });
    },
    onCancel: function (e) {
        e.preventDefault();
        this.props.onAction('cancel');
    },
    save: function (e) {
        this.props.onAction('save', {
            value: e.target.value
        });
    },
    render: function () {
        return (
            <div className='editing'>
                <input ref='wayPoint' type='text' name='wayPoint' defaultValue={this.props.name} onBlur={this.save} />
                <ul className='actions'>
                    <li>
                        <a href='#' onClick={this.onDone}>
                            <i className='icon-done'></i>
                        </a>
                    </li>
                    <li>
                        <a href='#' onClick={this.onCancel}>
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
                <p onClick={this.edit}>
                    <i className='icon-create'></i>
                {name}
                </p>
                <ul className='actions'>
                    <li>
                        <a href='#' onClick={this.add}>
                            <i className='icon-add'></i>
                        </a>
                    </li>
                    <li>
                        <a href='#' onClick={this.remove}>
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