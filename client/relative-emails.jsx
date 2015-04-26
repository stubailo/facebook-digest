// @jsx React.DOM

var RelativeEmailForm = ReactMeteor.createClass({
  onSubmit: function (event) {
    event.preventDefault();

    var form = event.target;

    var address = form.address.value;
    var name = form.name.value;

    RelativeEmails.insert({
      userId: Meteor.userId(),
      address: address,
      name: name
    });

    form.address.value = "";
    form.name.value = "";
  },
  render: function () {
    var self = this;

    return <form onSubmit={self.onSubmit}>
      <input type="text" name="name" placeholder="name" />
      <input type="email" name="address" placeholder="email" />
      <button>Save</button>
    </form>;
  }
});

var RelativeEmailsComponent = ReactMeteor.createClass({
  getMeteorState: function () {
    return {
      emails: RelativeEmails.find().fetch()
    }
  },
  removeEmail: function (email) {
    RelativeEmails.remove(email._id);
  },
  render: function () {
    var self = this;

    return <div>
      <h3>{"Your relative's emails:"}</h3>
      <ul>{
        self.state.emails.map(function (email) {
          var removeThisEmail = function () {
            self.removeEmail(email);
          };

          return <li key={email.address}>
            {email.name} ({email.address})
            <button onClick={removeThisEmail}>X</button>
          </li>;
        })
      }</ul>
      <RelativeEmailForm />
    </div>;
  }
});

Template.body.onRendered(function () {
  var emails = [
    "mom@google.com",
    "dad@google.com"
  ];

  React.render(<RelativeEmailsComponent emails={emails}/>, this.find(".react-container"));
});
