var nodemailer = require('nodemailer');
try {
  var config = require('../config/config');
} catch(e) {}
var _ = require('underscore');

// Create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME || config.gmail.username,
    pass: process.env.GMAIL_PASSWORD || config.gmail.password
  }
});

module.exports = function(mailOptions, cb) {
  mailOptions = mailOptions || {};
  _.defaults(mailOptions, {
    from: 'Tallest Tree App <'+process.env.GMAIL_EMAIL||config.gmail.email+'>',
    subject: '☎ Visit from Anon',
    text: 'You have an anonymous visitor.',
  });

  cb = cb || function(err, info) {
    if(err) {
      console.error(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  };

  if (!mailOptions.to) {
    cb('Error: No destination address for mail');
  } else {
    transporter.sendMail(mailOptions, cb);
  }
};
