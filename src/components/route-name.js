var React = require('react');

var EditRouteName = React.createClass({
    onBlur: function (e) {
        this.save(e.target.value);
    },
    onDone: function (e) {
        e.preventDefault();
        this.save(this.refs['routeName'].getDOMNode().value);
    },
    save: function (value) {
        this.props.onAction('save', value);
    },
    render: function () {
        return (
            <div className='edit-route-name'>
                <input ref='routeName' type='text' name='routeName' defaultValue={this.props.name} onBlur={this.onBlur} />
                <ul className='actions'>
                    <li>
                        <a href='#' onClick={this.onDone}>
                            <i className='icon-done'></i>
                        </a>
                    </li>
                </ul>
            </div>
            );
    }
});

var ViewRouteName = React.createClass({
    edit: function () {
        this.props.onAction('edit');
    },
    remove: function () {
        this.props.onAction('remove');
    },
    render: function () {
        return (
            <div className='view-route-name'>
                <p onClick={this.edit}>{this.props.name}</p>
                <a title='Delete this route' className='remove-route' href='#' onClick={this.remove}>
                    <i className='icon-clear'></i>
                </a>
            </div>
            );
    }
});

var RouteName = React.createClass({
    getInitialState: function () {
        return {
            editing: false
        }
    },
    onAction: function (action, value) {
        switch (action) {
            case 'edit':
                this.edit();
                break;
            case 'save':
                this.save(value);
                break;
            case 'remove':
                this.remove();
                break;
        }
    },
    edit: function () {
        this.setState({
            editing: true
        });
    },
    save: function (value) {
        this.setState({
            editing: false
        }, function () {
            this.props.onAction('change-name', value);
        });
    },
    remove: function () {
        this.props.onAction('remove');
    },
    render: function () {
        var route = this.props.route,
            routeNameElm;

        if (this.state.editing) {
            routeNameElm = <EditRouteName onAction={this.onAction} name={route.get('name')} />;
        } else {
            routeNameElm = <ViewRouteName onAction={this.onAction} name={route.get('name')} />
        }

        return (
            <div className='route-control'>
            {routeNameElm}
            </div>
            );
    }
});

module.exports = RouteName;