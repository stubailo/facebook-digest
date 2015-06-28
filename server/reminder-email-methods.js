Meteor.methods({
    /**
     * Send a reminder email to all users.
     */
    "/reminder-emails/sendAll": function () {
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        ReminderEmails.sendAll();
    }
});

ReminderEmails.sendAll = function () {
    Meteor.users.find().forEach(function(user) {
        // var toEmail = user.services.facebook.email;
        var toEmail = 'angela.zhang.17@gmail.com';
        var firstName = user.services.facebook.first_name;
        var fromEmail = 'Facebook Digest <zhangela+fd@mit.edu>';
        var subject = 'Stay in Touch with Your Loved Ones';
        var text = 'Hey ' + firstName + ", \n\nIt's time to email your loved ones photos of yourself!";

        check([toEmail, fromEmail, subject, text], [String]);

        Email.send({
            to: toEmail,
            from: fromEmail,
            subject: subject,
            text: text
        });
    });
};

/**
 * Generate and send a reminder email for this user
 *
 * Side effects:
 * Updates user.lastImportedTime to the current time
 * Sends email
 *
 * @param  {String} userId The ID of the user
 * @return {[type]}        [description]
 */
ReminderEmails.send = function (userId) {
  // TODO
}
