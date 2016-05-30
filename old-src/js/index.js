var React = require('react'),
    ReactDOM = require('react-dom'),
    domReady = require('domready'),
    Application = require('./components/application'),
    GoogleMaps = require('google-maps');

domReady(function () {
    GoogleMaps.LIBRARIES = ['places'];
    GoogleMaps.load(function (google) {
        ReactDOM.render(<Application mapService={google}/>, document.getElementById('app'));
    });
});
