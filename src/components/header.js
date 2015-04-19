var React = require('react');

var Header = React.createClass({
    render: function () {
        return (
            <header>
                <h1><i className='icon-location-on'></i> Route Planner</h1>
            </header>
            );
    }
});

module.exports = Header;