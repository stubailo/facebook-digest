// Can't declare the users collection

// Schema here mainly for documentation
Meteor.users.schema = {
  // max (last time the user clicked refresh, last time we generated a reminder email)
  // Used to determine which photos to include in the next reminder email
  lastImportedTime: Date
}

