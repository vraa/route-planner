var React = require('react');
var classNames = require('classnames');

const KEYS = {
    TAB: 9,
    ENTER: 13,
    ESC: 27
};

class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldValue: this.props.value,
            value: this.props.value
        };
    }

    handleKeyDown(e) {
        switch (e.which) {
            case KEYS.ENTER:
            case KEYS.TAB:
                this.props.onSave(this.state.value);
                break;
            case KEYS.ESC:
                this.setState({
                    value: this.state.oldValue
                }, function () {
                    this.props.onCancel(this.state.oldValue);
                });
            default:

        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleBlur() {
        this.props.onSave(this.state.value);
    }

    render() {
        var cx = classNames('text-input', this.props.className);
        return (
            <div className={cx}>
                <input type="text"
                       value={this.state.value}
                       onBlur={this.handleBlur.bind(this)}
                       onKeyDown={this.handleKeyDown.bind(this)}
                       onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

TextInput.defaultProps = {
    value: '',
    onSave: ()=> {
    },
    onCancel: (oldValue)=> {
        console.log('resetting to', oldValue);
    }
};

module.exports = TextInput;