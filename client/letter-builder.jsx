var {
  Tabs,
  Tab,
  Paper
} = mui;

var {
  RouteHandler,
  Navigation
} = ReactRouter;

LetterBuilder = React.createClass({
  mixins: [Navigation],
  goToTab(tab) {
    this.transitionTo(tab.props.route);
  },
  render() {
    return <div>
    <h1>Creating a letter</h1>
      <Paper zDepth={1}>
        <Tabs>
          <Tab label="1. Recipients" route="recipients" onActive={this.goToTab} />
          <Tab label="2. Photos" route="photos" onActive={this.goToTab} />
          <Tab label="3. Message" route="message" onActive={this.goToTab} />
        </Tabs>
        <RouteHandler />
      </Paper>
    </div>
  }
});