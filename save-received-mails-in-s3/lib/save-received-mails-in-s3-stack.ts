import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as actions from '@aws-cdk/aws-ses-actions';
import * as ses from '@aws-cdk/aws-ses';

export class SaveReceivedMailsInS3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const bucket = new s3.Bucket(this, 'Bucket');

    const ruleset = new ses.ReceiptRuleSet(this, "RuleSet", {
      receiptRuleSetName: 'saving-email-rule-set',
    });

    ruleset.addRule('SAVE_IN_S3_RULE', {
      recipients: ["hello@mutahirdomain.ml"],
      actions: [
        new actions.S3({
          bucket,
          objectKeyPrefix: 'emails/',  // will save all emails inside emails directory in s3 bucket
        })
      ],
      scanEnabled: true, // Enable spam and virus scanning
    })

  }
}
