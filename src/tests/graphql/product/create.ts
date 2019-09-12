import schema from "../../../graphql/schema";
import { graphql } from "graphql";
import { init, jDestroy } from "../../../config";

export const createProductGraphqlTest = () =>
  describe("Test product create Graphql", () => {
    beforeAll(async () => {
      init("test_db");
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test("create new product with correct infos", async () => {
      const mutation = `
        mutation {
          createProductParse(
            productInput: {
              productName: "bubble"
            }
          ) {
            status
            errors
            product {
              productId
              productName
              data{
                date
                inventoryLevel
              }
            }
          }
        }
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.createProductParse.status).toBe(`Successful`);
    });

    test("create new product with correct infos but duplicated name", async () => {
      const mutation = `
        mutation {
          createProductParse(
            productInput: {
              productName: "bubble"
            }
          ) {
            status
            errors
            product {
              productId
              productName
              data{
                date
                inventoryLevel
              }
            }
          }
        }
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.createProductParse.status).toBe(`Failed`);
    });

    test("create new product with incorrect infos: name is empty", async () => {
      const mutation = `
      mutation {
        createProductParse(
          productInput: {
            productName: ""
          }
        ) {
          status
          errors
          product {
            productId
            productName
            data{
              date
              inventoryLevel
            }
          }
        }
      }
      
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.createProductParse.status).toBe(`Failed`);
    });
    test("add a new data to product: date is wrong", async () => {
      const mutation = `
      mutation{
        addDataParse(
          productName:"bubble"
          dataInput:{
          date:21,
          inventoryLevel:3
        }){
          status
          errors
        }
      }
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.addDataParse.status).toBe(`Failed`);
    });
    test("add a new data to product: inventoryLevel out of range", async () => {
      const mutation = `
      mutation{
        addDataParse(
          productName:"bubble"
          dataInput:{
          date:1567695422884,
          inventoryLevel:31
        }){
          status
          errors
        }
      }
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.addDataParse.status).toBe(`Failed`);
    });
  });
