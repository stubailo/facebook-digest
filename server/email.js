Meteor.methods({
    sendEmails: function() {

        var self = this;

        Meteor.users.find().forEach(function(user) {
            // var toEmail = user.services.facebook.email;
            var toEmail = 'angela.zhang.17@gmail.com';
            var firstName = user.services.facebook.first_name;
            var fromEmail = 'Facebook Digest <zhangela+fd@mit.edu>';
            var subject = 'Stay in Touch with Your Loved Ones';
            var text = 'Hey ' + firstName + ", \n\nIt's time to email your loved ones photos of yourself!";

            check([toEmail, fromEmail, subject, text], [String]);

            // Let other method calls from the same client start running,
            // without waiting for the email sending to complete.
            self.unblock();

            Email.send({
                to: toEmail,
                from: fromEmail,
                subject: subject,
                text: text
            });
        });
    }
});