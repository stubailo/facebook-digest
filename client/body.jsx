// @jsx React.DOM

App = React.createClass({
  render() {
    return <div>
      <RecipientsComponent />
      <SelectableFacebookPhotosGrid />
    </div>
  }
});

Template.reactBody.helpers({
  App() {
    return App;
  }
});
