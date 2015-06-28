var {
  Tabs,
  Tab,
  Paper,
  RaisedButton
} = mui;

var {
  RouteHandler,
  Navigation,
  State
} = ReactRouter;

var LetterBuilder = React.createClass({
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
    return <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h1>Creating a letter</h1>
        </div>
        <div className="col-md-4">
          <span className="pull-right">
            <RaisedButton primary={true} label="Review & send" />
          </span>
        </div>
      </div>
      <Paper zDepth={1}>
        <Tabs initialSelectedIndex={this.getTabIndexFromRoute()}>
          { this.tabData.map(props => <Tab
              onActive={this.goToTab}
              key={props.route}
              {...props} /> )}
        </Tabs>
        <RouteHandler letter={this.props.letter} />
      </Paper>
    </div>
  }
});

LetterPage = React.createClass({
  mixins: [ReactMeteorData],
  componentWillMount() {
    var unsentLetter = Letters.findOne({
      userId: Meteor.userId(),
      status: Letters.STATUS.NOT_SENT
    });

    if (! unsentLetter) {
      Meteor.call("/letters/create");
    }
  },
  getMeteorData() {
    return {
      letter: Letters.findOne({
        userId: Meteor.userId(),
        status: Letters.STATUS.NOT_SENT
      })
    };
  },
  render() {
    if (this.data.letter) {
      return <LetterBuilder letter={this.data.letter}/>;
    } else {
      return <div>Creating letter...</div>
    }
  }
});
