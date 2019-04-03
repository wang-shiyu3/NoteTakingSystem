const logger = require("./log");
const { isUserExisted } = require("./user");
const { TOPIC_NOTIFY_ARN } = require("./../configs/config");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const reset = async ctx => {
  const { email } = ctx.request.body;
  if (!isUserExisted) {
    ctx.status = 500;
    ctx.body = {
      message: "No this user"
    };
    logger.info({
      message: "No this user"
    });
    return;
  }

  const params = {
    Message: email,
    TopicArn: TOPIC_NOTIFY_ARN
  };

  const aws = new AWS.SNS({ apiVersion: "2010-03-31" });
  const pub = await aws.publish(params).promise();
  ctx.body = pub;
};

module.exports = reset;
