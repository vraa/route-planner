var React = require('react');

var RouteTabs = React.createClass({
    addRoute: function () {
        if (this.props.routes.length < 10) {
            this.props.onAdd();
        } else {
            alert('You have reached the maximum routes.');
        }
    },
    switchRoute: function (routeIndex) {
        if (this.props.active != routeIndex) {
            this.props.onSwitch(routeIndex);
        }
    },
    render: function () {
        var routes = this.props.routes,
            self = this,
            tabsElm = routes.map(function (route, i) {
                var active = (i === self.props.active) ? 'active tab' : 'tab';
                return (
                    <li title='Switch to this route' className={active} onClick={self.switchRoute.bind(self, i)} key={'route' + i}>
                        {i + 1}
                    </li>
                    );
            });

        return (
            <ol className='route-tabs'>
            {tabsElm}
                <li title='Add a new route' onClick={this.addRoute} key='add-route'>
                    <i className='icon-add'></i>
                </li>
            </ol>
            );
    }
});

module.exports = RouteTabs;