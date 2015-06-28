var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  Redirect
} = ReactRouter;

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} name="home" />
    <Route handler={LetterBuilder} name="letter-builder" />
  </Route>
);

Meteor.startup(function () {
  ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById("react-container"));
  });
});
