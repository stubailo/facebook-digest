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
  sentTime: String
};

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
Letters.create = function (reminderEmailId) {

}

/**
 * Send the letter to all active recipients of the letter's owner.
 *
 * Throws an error if sending fails.
 * 
 * @param  {String} letterId The letter to send
 */
Letters.send = function (letterId) {

}

Letters.selectPhoto = function (letterId, photoId) {

}

Letters.deselectPhoto = function (letterId, photoId) {

}

Letters.updateText = function (letterId, newText) {
  
}


