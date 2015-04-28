var React = require('react'),
    vent = require('../util/vent');

var Place = React.createClass({
    render: function () {
        var place = this.props.place;
        console.log(place);
        return (
            <div className='place'>
                <h1>Place</h1>
            </div>
            );
    }
});

module.exports = Place;