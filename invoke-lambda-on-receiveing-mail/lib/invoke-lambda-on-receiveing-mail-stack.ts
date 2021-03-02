import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as actions from "@aws-cdk/aws-ses-actions";
import * as ses from '@aws-cdk/aws-ses';

export class InvokeLambdaOnReceiveingMailStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here


    // Setting a lambda function which will be called on receiveing email
    const lambdaFn = new lambda.Function(this, 'SES_ACTION_LAMBDA', {
      code: lambda.Code.fromInline(
        `exports.handler = (event)=>{ console.log("EVENT ==>> ",JSON.stringify(event)) }` 
      ),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
    });

    const ruleSet = new ses.ReceiptRuleSet(this, 'RuleSet', {
      receiptRuleSetName: 'calling-lambda-rule-set',
    });

    // creating arule set
    ruleSet.addRule('INVODE-LAMBDA-RULE', {

      recipients: ["hello@mutahirdomain.ml"],  // if no recipients than the action will be called on any incoming mail addresses of verified domains
      actions: [
        new actions.Lambda({ // / defining an action when receive email on given recipients
          function: lambdaFn,
          invocationType: actions.LambdaInvocationType.EVENT,
        }),
      ],
      scanEnabled: true, // Enable spam and virus scanning
    })

  }
}
