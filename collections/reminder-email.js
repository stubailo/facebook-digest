ReminderEmails = new Mongo.Collection("reminder-emails");

ReminderEmails.schema = {
  // ID of the user that got this reminder email
  userId: String,

  // The current time when the email was generated and sent
  generatedTime: Date,

  // Array of Facebook photo IDs
  // Most liked photos since user.lastImportTime
  photos: [String],

  // The actual content of the email that was sent, to have as a record
  html: String
}
