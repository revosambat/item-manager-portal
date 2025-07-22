import { defineFunction } from '@aws-amplify/backend';

export const tsFunction = defineFunction({
  name: 'ts-hello-world',
  entry: './handler.ts',
  runtime: 22 // Node.js 22 runtime
});