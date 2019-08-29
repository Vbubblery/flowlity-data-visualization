import schema from '../../../graphql/schema';
import {graphql} from 'graphql';
import {dbConnection} from '../../../config/db';
import {getConnection, getRepository} from 'typeorm';

export const createExampleGraphqlTest = () =>
  describe('Test example create Graphql', ()=>{
    beforeAll(async () => {
      await dbConnection();
    });

    afterAll(async () => {
    // close connection
      await getConnection().close();
    });
    afterEach(async () => {
      await getConnection().synchronize(true);
    });
    const mutation = `mutation{
    createExampleParse(exampleInput:{
      name:"bubble"
      path:"hello"
    }){
      status
    }
  }
  `;

    test('create new example with correct infos', async ()=>{
      const response = await graphql(schema, mutation);
      if (response.data) {
        expect(response.data.createExampleParse.status)
            .toBe('Successful');
      } else expect(response.data).toBeDefined();
    });
  });
