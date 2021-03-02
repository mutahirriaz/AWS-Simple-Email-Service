import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as InvokeLambdaOnReceiveingMail from '../lib/invoke-lambda-on-receiveing-mail-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new InvokeLambdaOnReceiveingMail.InvokeLambdaOnReceiveingMailStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
