'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

var sns = new AWS.SNS({ apiVersion: '2010-03-31' });

function headsOrTails(req, res, next) {
  var headsOrTails = Math.floor(Math.random() * 10) > 4 ? 'heads it is!' : 'tails it is!';

  var phoneNumbers = req.body.phoneNumbers;

  var promises = phoneNumbers.map(function (phoneNumber) {
    return sns.publish({
      Message: headsOrTails,
      PhoneNumber: phoneNumber
    }).promise();
  });

  Promise.all(promises).then(function (values) {
    res.json({
      message: values,
      result: headsOrTails
    });
  }).catch(function (error) {
    res.json({
      error: error
    });
  });
}

exports.default = { headsOrTails: headsOrTails };
//# sourceMappingURL=random.controller.js.map
