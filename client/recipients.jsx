// @jsx React.DOM

var RecipientForm = React.createClass({
  onSubmit: function (event) {
    event.preventDefault();

    var form = event.target;

    var email = form.email.value;
    var name = form.name.value;

    // TODO: Handle errors
    Meteor.call("/recipients/insert", {
      userId: Meteor.userId(),
      email: email,
      name: name
    });

    form.email.value = "";
    form.name.value = "";
  },
  render: function () {
    var self = this;

    return <form onSubmit={self.onSubmit}>
      <input type="text" name="name" placeholder="name" />
      <input type="email" name="email" placeholder="email" />
      <button>Save</button>
    </form>;
  }
});

RecipientsComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function () {
    return {
      emails: Recipients.find({ userId: Meteor.userId() }).fetch()
    }
  },
  removeRecipient: function (recipient) {
    Meteor.call("/recipients/remove", recipient._id);
  },
  render: function () {
    var self = this;

    return <div>
      <h3>{"Recipients:"}</h3>
      <ul>{
        self.data.emails.map(function (recipient) {
          return <li key={recipient.email}>
            {recipient.name} ({recipient.email})
            <button onClick={self.removeRecipient.bind(self, recipient)}>X</button>
          </li>;
        })
      }</ul>
      <RecipientForm />
    </div>;
  }
});
