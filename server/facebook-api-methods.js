var fbgraph = Meteor.npmRequire("fbgraph");

Meteor.methods({
  getRecentPhotos: function () {
    if (! Meteor.userId()) {
      throw new Meteor.Error("must-be-logged-in");
    }

    var accessToken = Meteor.user().services.facebook.accessToken;
    var id = Meteor.user().services.facebook.id;

    var photos = Meteor.wrapAsync(fbgraph.get)("/" + id + "/photos", {access_token: accessToken});

    Meteor.users.update(Meteor.userId(), {$set: {
      "profile.photos": photos
    }});
  }
});