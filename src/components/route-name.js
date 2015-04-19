var React = require('react');

var RouteName = React.createClass({
    remove: function () {

    },
    render: function () {
        return (
            <div className='route-control'>
                <p>Route 1</p>
                <a title='Delete this route' className='remove-route' href='#' onClick={this.remove}>
                    <i className='icon-clear'></i>
                </a>
            </div>
            );
    }
});

module.exports = RouteName;