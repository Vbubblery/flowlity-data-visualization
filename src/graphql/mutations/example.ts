import {ExampleInput} from '../types/mutations/example';
import {createExampleResolver} from '../resolvers/example';
import {responseType} from '../types/queries/response';

export const createExampleParse = {
  type: responseType,
  args: {
    exampleInput: {
      type: ExampleInput,
    },
  },
  resolve: createExampleResolver,
};
