var React = require('react');
var classNames = require('classnames');
var TextInput = require('./text-input');

class EditableText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }

    componentDidMount() {
        if (this.props.edit) {
            this.setState({
                editing: true
            });
        }
    }

    edit() {
        this.setState({
            editing: true
        });
    }

    save(value) {
        if (this.props.onSave) {
            this.props.onSave(value);
        }
        this.setState({
            editing: false
        });
    }

    cancel() {
        if (this.props.onSave) {
            this.props.onSave(this.props.value);
        }
        this.cancelEdit();
    }

    cancelEdit() {
        this.setState({
            editing: false
        });
    }

    render() {
        var textInputElm;
        var cx = classNames('editable-text', this.props.className, {editing: this.state.editing});
        var cxLabel = classNames('text-label');

        if (this.state.editing) {
            textInputElm = <TextInput
                placeholder={this.props.placeholder}
                domElm={this.props.domElm}
                value={this.props.value}
                onSave={this.save.bind(this)}
                onCancel={this.cancel.bind(this)}
                onCancelEdit={this.cancelEdit.bind(this)}
            />
        } else {
            textInputElm = <p className={cxLabel} onClick={this.edit.bind(this)}>{this.props.value}</p>
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