Recipients = new Mongo.Collection("relative-emails");

Recipients.STATUS = {
  INACTIVE: 0,
  ACTIVE: 1
};

Recipients.schema = {
  // The user to whom this recipient belongs
  userId: String,

  // This recipient's email address
  email: String,

  // The recipient's name
  name: String,

  // Member of the Recipients.STATUS enum
  // Stores the user's decision of whether to send the current letter to this
  // recipient via email
  emailStatus: Number
}

Meteor.methods({
  "/recipients/ofUser": function(userId) {
    return Recipients.find({userId: userId}).fetch();
  },

  "/recipients/insert": function (newRecipient) {
    // Make sure we set owner correctly
    newRecipient.userId = this.userId;

    _.defaults(newRecipient, { emailStatus: Recipients.STATUS.ACTIVE });

    check(newRecipient, Recipients.schema);

    Recipients.insert(newRecipient);
  },
  "/recipients/remove": function (recipientId) {
    // Only remove if the current user owns it
    Recipients.remove({
      _id: recipientId,
      userId: this.userId
    });
  },
  "/recipients/update": function (recipientId, fieldsToUpdate) {
    throw new Error("not implemented");
  },
  "/recipients/setActive": function (recipientId) {
    var updated = Recipients.update({
      _id: recipientId,
      userId: this.userId
    }, {
      $set: {
        emailStatus: Recipients.STATUS.ACTIVE
      }
    });

    if (! updated) {
      throw new Meteor.Error("permission-denied");
    }
  },
  "/recipients/setInactive": function (recipientId) {
    var updated = Recipients.update({
      _id: recipientId,
      userId: this.userId
    }, {
      $set: {
        emailStatus: Recipients.STATUS.INACTIVE
      }
    });

    if (! updated) {
      throw new Meteor.Error("permission-denied");
    }
  }
})
