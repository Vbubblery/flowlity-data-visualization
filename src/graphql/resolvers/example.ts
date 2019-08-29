import {Example, ExampleObject} from '../../orm/entities/example';

// queries:

export const getAllExampleResolver = async (__:any, args:any) =>{
  return await Example.find();
};


// ---------------------------------------------------------
// mutations:
export const createExampleResolver = async (__:any, args:any) =>{
  const data:ExampleObject = args.exampleInput;
  const t = await new Example(data).save();
  return {status: 1};
};
