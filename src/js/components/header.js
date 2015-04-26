var React = require('react');

var Header = React.createClass({
    render: function () {
        return (
            <header>
                <h1><i className='icon-location-on'></i> Route Planner</h1>
                <p className='author'>Built by <a title='Veera - JavaScript developer with Java background.' href='http://veerasundar.com'>Veera</a> | Fork this at <a title='Route planner using Google Maps, built with React JS' href='https://github.com/vraa/route-planner'>Github</a></p>
            </header>
            );
    }
});

module.exports = Header;