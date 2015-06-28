var {
  TextField
} = mui;

MessageEditor = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object
  },
  subjectChanged: _.debounce(function () {
    Meteor.call("/letters/updateSubject", this.props.letter._id, this.refs.subject.getValue());
  }, 300),
  messageChanged: _.debounce(function () {
    Meteor.call("/letters/updateMessage", this.props.letter._id, this.refs.message.getValue());
  }, 300),
  render: function () {
    return <div style={{
        padding: this.context.muiTheme.spacing.desktopGutterLess
          }} >
      <TextField
        fullWidth={true}
        ref="subject"
        onChange={this.subjectChanged}
        defaultValue={this.props.letter.subject}
        floatingLabelText="Subject" />
      <TextField
        multiLine={true}
        fullWidth={true}
        ref="message"
        onChange={this.messageChanged}
        defaultValue={this.props.letter.message}
        floatingLabelText="Message" />
    </div>
  }
});