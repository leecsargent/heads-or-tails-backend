var AWS = require('aws-sdk');

AWS.config.update(
  {
    region: 'us-east-1',
  }
);

const sns = new AWS.SNS(
  {
    apiVersion: '2010-03-31'
  }
);

function headsOrTails(req, res, next) {
  const headsOrTails = Math.random() >= 0.5
    ? 'heads it is!'
    : 'tails it is!';

  const phoneNumbers = req.body.phoneNumbers;

  const promises = phoneNumbers.map(phoneNumber => {
    return sns.publish({
      Message: headsOrTails,
      PhoneNumber: phoneNumber,
    }).promise();
  })

  Promise.all(promises).then(function(values) {
    res.json({
      message: values,
      result: headsOrTails,
    })
  })
  .catch(function(error) {
    res.json({
      error: error,
    })
  });
}

export default { headsOrTails };
