Letters = new Mongo.Collection("letters");

Letters.STATUS = {
  NOT_SENT: 0,
  SENT: 1
};

Letters.schema = {
  // ID of the user that sent or is currently editing this letter
  userId: String,

  // The time at which the user started editing this letter
  createdAtTime: Date,

  // max (last time the user clicked refresh, this.createdAtTime)
  // Represents which photos this user considered when
  // picking photos for this letter.
  candidateSelectionTime: Date,

  // A member of the Letters.STATUS enum; the status of this letter.
  status: Number,

  // The photos sent in this letter, represented as an array of Facebook photo IDs
  photos: [String],

  // The actual HTML content of the email that was sent
  html: String,

  // When the email and/or physical letter were sent
  sentTime: Match.Optional(Date),

  //
  recipients: [String],

  // Subject that the user entered
  subject: String,

  // Message that the user entered
  message: String
};



Meteor.methods({

  /**
   * Create a new letter, and preselect photos based on the reminder email, if
   * provided.
   *
   * In the case where a user already has an unsent letter, throws an error
   * because we don't support having two letters being edited at once.
   *
   * @param  {String} reminderEmailId Optional - if provided, preselect photos
   * that were sent in this reminder email.
   */
  "/letters/create": function(reminderEmailId) {

    if (! Meteor.userId()) {
      throw new Meteor.Error("must-be-logged-in");
    }

    var unsentLetter = Meteor.call("/letters/getUnsentLetter");
    if (unsentLetter) {
      throw new Error("You can only have 1 unsent letter at a time.")
    }

    var photos = []
    if (reminderEmailId) {
      // TODO(angela): set photos to the photos in the reminder email id
    }

    var letter = {
      userId: Meteor.userId(),
      createdAtTime: new Date(),
      candidateSelectionTime: new Date(),
      status: Letters.STATUS.NOT_SENT,
      photos: photos,
      html: "",
      recipients: [],
      message: "",
      subject: ""
    }
    check(letter, Letters.schema);
    return Letters.insert(letter);
  },

  /**
   * Send the letter to all active recipients of the letter's owner.
   *
   * Throws an error if sending fails.
   *
   * @param  {String} letterId The letter to send
   */
  "/letters/send": function(letterId) {
    var unsentLetter;

    if (letterId) {
      unsentLetter = Letters.findOne(letterId);
    } else {
      unsentLetter = Meteor.call("/letters/getUnsentLetter");
      letterId = unsentLetter._id;
    }

    var recipients = Meteor.call("/recipients/ofUser", Meteor.userId());

    recipients.forEach(recipient => {
      Meteor.call("/letter/sendLetter", letterId, recipient);
    });

    // var updated = Letters.update({
    //   _id: letterId
    // }, {
    //   $set: {
    //     status: Letters.STATUS.SENT
    //   }
    // });

    // if (! updated) {
    //   throw new Meteor.Error("Letter not found.");
    // }

  },

  "/letters/addPhoto": function(letterId, photoId) {
    Letters.update(letterId, {
      $addToSet: {
        photos: photoId
      }
    });
  },

  "/letters/removePhoto": function(letterId, photoId) {
    Letters.update(letterId, {
      $pull: {
        photos: photoId
      }
    });
  },

  "/letters/getUnsentLetter": function() {
    var unsentLetter = Letters.findOne({userId: Meteor.userId(), status: Letters.STATUS.NOT_SENT});
    return unsentLetter;
  },

  "/letters/updateSubject": function(letterId, newText) {
    Letters.update(letterId, {
      $set: {
        subject: newText
      }
    });
  },

  "/letters/updateMessage": function(letterId, newText) {
    Letters.update(letterId, {
      $set: {
        message: newText
      }
    });
  }
});
