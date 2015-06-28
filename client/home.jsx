var {
  Link
} = ReactRouter;

var {
  RaisedButton
} = mui;

Home = React.createClass({
  render() {
    return <RaisedButton
        containerElement={<Link to="letter-builder"/>}
        linkButton={true}
        label="Go to letter builder" />;
  }
});