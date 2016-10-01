require('../scss/base.scss');


var React = require('react');
var ReactDOM = require('react-dom');
var TextInput = require('./components/text-input');

ReactDOM.render(<TextInput/>, document.getElementById('app'));
console.log('rendered react app');