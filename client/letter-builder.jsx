var {
  Tabs,
  Tab,
  Paper
} = mui;

var {
  RouteHandler,
  Navigation,
  State
} = ReactRouter;

LetterBuilder = React.createClass({
  mixins: [Navigation, State],
  goToTab(tab) {
    this.transitionTo(tab.props.route);
  },
  tabData: [
    { label: "1. Recipients", route: "recipients" },
    { label: "2. Photos", route: "photos" },
    { label: "3. Message", route: "message" }
  ],
  getTabIndexFromRoute() {
    var tabIndex = 0;

    _.some(this.tabData, (props, index) => {
      if (this.isActive(props.route)) {
        tabIndex = index;
        return true;
      }
    });

    return tabIndex;
  },
  render() {
    return <div>
      <h1>Creating a letter</h1>
      <Paper zDepth={1}>
        <Tabs initialSelectedIndex={this.getTabIndexFromRoute()}>
          { this.tabData.map(props => <Tab
              onActive={this.goToTab}
              key={props.route}
              {...props} /> )}
        </Tabs>
        <RouteHandler />
      </Paper>
    </div>
  }
});