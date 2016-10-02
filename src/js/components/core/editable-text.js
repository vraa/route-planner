var React = require('react');
var classNames = require('classnames');
var TextInput = require('./text-input');

class EditableText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            value: this.props.value
        }
    }

    edit() {
        this.setState({
            editing: true
        });
    }

    save(value) {
        this.setState({
            value: value,
            editing: false
        })
    }

    cancel() {
        this.setState({
            editing: false
        })
    }

    render() {
        var elm;

        var cx = classNames('editable-text', this.props.className);

        if (this.state.editing) {
            elm = <TextInput
                value={this.state.value}
                onSave={this.save.bind(this)}
                onCancel={this.cancel.bind(this)}
            />
        } else {
            elm = <p onClick={this.edit.bind(this)}>{this.state.value}</p>
        }

        return (
            <div className={cx}>
                {elm}
            </div>
        )
    }
}

EditableText.defaultProps = {
    value: 'Editable text'
}

module.exports = EditableText;