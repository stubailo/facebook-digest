var {
  TextField
} = mui;

MessageEditor = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object
  },
  render: function () {
    console.log(this.context.muiTheme);
    return <div style={{
        padding: this.context.muiTheme.spacing.desktopGutterLess
          }} >
      <h3>Put in a nice message for your relatives:</h3>
      <TextField multiLine={true} fullWidth={true} />
    </div>
  }
});