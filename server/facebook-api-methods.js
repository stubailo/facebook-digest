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
  getFacebookPhotosSince: function (since, limit) {
    since = moment(since);
    limit = limit || 12;
    var photosUrl = makeFacebookPhotosUrl(limit, since.unix(), null);
    var after = Meteor.call("_updateFacebookPhotos", photosUrl);
    return makeFacebookPhotosUrl(limit, null, after)
  },

  getFacebookPhotosNext: function(photosUrl, limit) {
    limit = limit || 12;
    after = Meteor.call("_appendFacebookPhotos", photosUrl);
    return makeFacebookPhotosUrl(limit, null, after)
  },

  _updateFacebookPhotos: function(photosUrl) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("must-be-logged-in");
    }
    var photos = Meteor.call("_getFacebookPhotos", photosUrl);
    Meteor.users.update(Meteor.userId(), {$set: {
      "profile.photos": photos && photos.data
    }});
    return photos.paging.cursors.after;
  },


  _appendFacebookPhotos: function(photosUrl) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("must-be-logged-in");
    }
    var photos = Meteor.call("_getFacebookPhotos", photosUrl);
    Meteor.users.update(Meteor.userId(), {$pushAll: {
      "profile.photos": photos && photos.data
    }});
    return photos.paging.cursors.after;
  },

  _getFacebookPhotos: function(photosUrl) {
    var accessToken = Meteor.user().services.facebook.accessToken;
    try {
      return Meteor.wrapAsync(fbgraph.get)(photosUrl, {access_token: accessToken});
    } catch(error) {
      console.log(error);
    }
  }
});

function makeFacebookPhotosUrl(limit, since, after) {
  var id = Meteor.user().services.facebook.id;
  var url = "/" + id + "/photos/?limit=" + limit;

  if (since) {
    url += "&since=" +  since
  }

  if (after) {
    url += "&after=" +  after
  }

  return url;
}

getFacebookPhotoUrl = function (imageId) {
  var accessToken = Meteor.user().services.facebook.accessToken;
  try {
    return Meteor.wrapAsync(fbgraph.get)("/" + imageId, {access_token: accessToken}).images[0].source;
  } catch(error) {
    console.log(error);
  }
}