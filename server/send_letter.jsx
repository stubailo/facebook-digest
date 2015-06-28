Meteor.methods({
    /**
     * Send a letter to user's recipients.
     */
    "/letter/sendLetter": function (letterId, recipient) {
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        var letter = Letters.findOne({_id: letterId, userId: Meteor.userId()});

        if (! letter) {
          throw new Error('You can only send letter that you wrote.')
        }

        var toEmail = recipient.email;
        var fromEmail = Meteor.user().services.facebook.email;
        var subject = letter.subject || 'subject!!!';
        var html = letter.html || '<b>empty</b> email!';

        check([toEmail, fromEmail, subject, html], [String]);

        Email.send({
            to: toEmail,
            from: fromEmail,
            subject: subject,
            html: html
        });
    }
});
