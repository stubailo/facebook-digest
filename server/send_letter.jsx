var request = Meteor.npmRequire("request");

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
        var text = letter.message || '<b>empty</b> email!';

        var imageIds = letter.photos;
        var imageUrls = imageIds.map(getFacebookPhotoUrl);
        var imageStreams = imageUrls.map(function(imageUrl) {
            return request(imageUrl);
        });
        var attachments = imageStreams.map(stream => {
          return {
            streamSource: stream,
            contentType: 'image/jpeg'
          }
        });

        check([toEmail, fromEmail, subject, text], [String]);

        Email.send({
            to: toEmail,
            from: fromEmail,
            subject: subject,
            text: text,
            attachments: attachments
        });
    }
});
