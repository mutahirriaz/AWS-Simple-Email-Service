import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { Effect, PolicyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam';

export class SendingEmailUsingSesAndLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here


    // Creating a IAM role for lambda to give access of ses send email
    const role = new Role(this, "LambdaRole", {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    });

    // Attaching ses access to policy
    const policy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["ses:SendEmail", "ses:SendRawEmail", "logs:*"],
      resources: ['*']
    });

    //granting IAM permissions to role
    role.addToPolicy(policy)


    // Creating send email lambda handler
    const lambdaFn = new lambda.Function(this, 'LambdaSendEmail', {
      code: lambda.Code.fromAsset('lambda'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      role: role
    });

  }
}
