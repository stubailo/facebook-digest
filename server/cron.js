SyncedCron.start();

SyncedCron.add({
  name: 'Cron job to send monthly emails to users.',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('on the first day of the month');

    // UNCOMMENT BELOW TO EASILY DEBUG.
    // return parser.text('every 30 seconds');

  },
  job: function() {
    Meteor.call("sendEmails");
  }
});