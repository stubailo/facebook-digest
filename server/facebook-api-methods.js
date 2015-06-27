var fbgraph = Meteor.npmRequire("fbgraph");

Meteor.methods({
  /**
   * Return all Facebook photos this user was tagged in after a certain time
   *
   * Side effects: updates user.lastImportTime and letter.candidateSelectionTime
   * to current time
   *
   * @param  {Date} since Return all photos uploaded after this timestamp
   * @return {Array} An array of photo objects as returned from the Facebook API
   */
  getFacebookPhotosSince: function (since) {
    var since = moment(since);
    var now = moment();
    var numDays = now.diff(since, 'days');
    Meteor.call("_getRecentPhotos", numDays);

  },

  getFacebookPhotosUntil: function (until, limit) {
    // limit should have a default
  },

  /**
   * Internal method to get Facebook photos
   */
  _getRecentPhotos: function (numDays, limit, offset) {
    numDays = numDays || 30;  // default to photos from last 30 days
    limit = limit || 100;  // default to 100 photos max
    offset = offset || 0;  // default to offset = 0

    if (! Meteor.userId()) {
      throw new Meteor.Error("must-be-logged-in");
    }

    var accessToken = Meteor.user().services.facebook.accessToken;
    var id = Meteor.user().services.facebook.id;

    var now = moment();
    var startTime = now.subtract({days: numDays});

    var photosUrl = "/" + id + "/photos/" +
      "?since=" + startTime.unix() +
      "&limit=" + limit +
      "&offset=" + offset;

    try {
      var photos = Meteor.wrapAsync(fbgraph.get)(photosUrl, {access_token: accessToken});
    }
    catch(error) {
      console.log(error);
    }

    Meteor.users.update(Meteor.userId(), {$set: {
      "profile.photos": photos
    }});
  }
});