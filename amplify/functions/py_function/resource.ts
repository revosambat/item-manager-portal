import { defineFunction } from '@aws-amplify/backend';
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";


export const pyFunction = defineFunction(
  // The first argument is a function that receives the CDK scope
  (scope) =>
    new Function(scope, "say-hello", {
      functionName: "py-hello-world",
      runtime: Runtime.PYTHON_3_13,
      handler: "handler.helloWorld", // The format is 'filename.function_name'
      code: Code.fromAsset("."), // current directory
    })
);