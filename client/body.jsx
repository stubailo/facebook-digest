// @jsx React.DOM

var {
  Tabs,
  Tab,
  Paper
} = mui;

var ThemeManager = new mui.Styles.ThemeManager();

App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    return <div>
    <h1>Creating a letter</h1>
      <Paper zDepth={1}><Tabs>
        <Tab label="1. Recipients">
          <RecipientsComponent />
        </Tab>
        <Tab label="2. Photos">
          <SelectableFacebookPhotosGrid />
        </Tab>
        <Tab label="3. Message">
          Hello
        </Tab>
      </Tabs></Paper>
    </div>
  }
});

Template.reactBody.helpers({
  App() {
    return App;
  }
});

injectTapEventPlugin();

// Inject Roboto font
Meteor.startup(function () {
  var WebFontConfig = {
    google: { families: [ 'Roboto:400,300,500:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
});
