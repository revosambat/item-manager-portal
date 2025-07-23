import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { tsFunction } from './functions/ts_function/resource';
// import { pyFunction } from './functions/py_function/resource';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
  tsFunction,
  // pyFunction
});

backend.addOutput({
  custom: {
    API: {
      endpoint: `https://${backend.stack.region}.amazonaws.com`
    }
  }
})