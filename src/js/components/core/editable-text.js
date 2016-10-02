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
        var textInputElm;

        var cx = classNames('editable-text', this.props.className, {editing: this.state.editing});

        var cxLabel = classNames('text-label');

        if (this.state.editing) {
            textInputElm = <TextInput
                value={this.state.value}
                onSave={this.save.bind(this)}
                onCancel={this.cancel.bind(this)}
            />
        } else {
            textInputElm = <p className={cxLabel} onClick={this.edit.bind(this)}>{this.state.value}</p>
        }


        return (
            <div className={cx}>
                {textInputElm}
            </div>
        )
    }
}

EditableText.defaultProps = {
    value: 'Editable text'
}

module.exports = EditableText;