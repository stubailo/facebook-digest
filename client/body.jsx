// @jsx React.DOM

Template.body.onRendered(function () {
  var emails = [
    "mom@google.com",
    "dad@google.com"
  ];

  React.render(<div>
    <RelativeEmailsComponent emails={emails}/>
    <SelectableFacebookPhotosGrid />
  </div>, this.find(".react-container"));
});