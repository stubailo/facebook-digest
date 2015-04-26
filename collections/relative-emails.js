RelativeEmails = new Mongo.Collection("relative-emails");

RelativeEmails.schema = {
  userId: String, // the user whose relative this is
  address: String, // the email address to send to
  name: String // optional name/description field
}

if (Meteor.isServer) {
  // TODO: add publication
}
