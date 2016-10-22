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
    }

    handleKeyDown(e) {
        switch (e.which) {
            case KEYS.ENTER:
            case KEYS.TAB:
                this.props.onSave(e.target.value);
                break;
            case KEYS.ESC:
                this.props.onCancel(this.props.oldValue);
            default:

        }
    }

    handleBlur() {
        this.props.onCancelEdit();
    }

    focus(input) {
        if (this.props.domElm) {
            this.props.domElm(input);
        }
        if (input != null) {
            input.focus();
        }
    }

    render() {
        var cx = classNames('text-input', this.props.className);
        return (
            <div className={cx}>
                <input type="text"
                       placeholder={this.props.placeholder}
                       defaultValue={this.props.value}
                       ref={this.focus.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                       onKeyDown={this.handleKeyDown.bind(this)}
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
    }
};

module.exports = TextInput;