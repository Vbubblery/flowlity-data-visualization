import schema from "../../../graphql/schema";
import { graphql } from "graphql";
import { init, jDestroy } from "../../../config";

export const updateProductGraphqlTest = () =>
  describe("Test product update Graphql", () => {
    beforeAll(async () => {
      init("test_db");
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test("update a product with correct infos", async () => {
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

      await graphql(schema, mutation);
      const addMutation = `
        mutation{
          addDataParse(
            productName:"bubble"
            dataInput:{
              date:1567695412873,
              inventoryLevel:0
          }){
            status
            errors
          }
        }
      `;
      await graphql(schema, addMutation);
      const updateMutation = `mutation {
        updateProductDataParse(
          productName: "bubble"
          productUpdateInput: { date:1567695412873 inventoryLevel: 4 }
        ) {
          status
          errors
          product {
            data{
              date
              inventoryLevel
            }
          }
        }
      }
      `;
      const response = <any>await graphql(schema, updateMutation);
      expect(response.data.updateProductDataParse.status).toBe(`Successful`);
      expect(
        response.data.updateProductDataParse.product.data[0].inventoryLevel
      ).toBe(4);
    });
    test("update a product with incorrect infos:out of range", async () => {
      const updateMutation = `mutation {
        updateProductDataParse(
          productName: "bubble"
          productUpdateInput: { date:1567695412873 inventoryLevel: 22 }
        ) {
          status
          errors
          product {
            data{
              date
              inventoryLevel
            }
          }
        }
      }
      `;
      const response = <any>await graphql(schema, updateMutation);
      expect(response.data.updateProductDataParse.status).toBe(`Failed`);
    });
    test("update a product with incorrect infos: is string", async () => {
      const updateMutation = `mutation {
        updateProductDataParse(
          productName: "bubble"
          productUpdateInput: { date:1567695412873 inventoryLevel: "2" }
        ) {
          status
          errors
          product {
            data{
              date
              inventoryLevel
            }
          }
        }
      }
      `;
      const response = <any>await graphql(schema, updateMutation);
      expect(response.data).toBeUndefined();
    });
    test("update a product with incorrect infos: name is wrong", async () => {
      const updateMutation = `mutation {
        updateProductDataParse(
          productName: "bubble321"
          productUpdateInput: { date:1567695412873 inventoryLevel: 1 }
        ) {
          status
          errors
          product {
            data{
              date
              inventoryLevel
            }
          }
        }
      }
      `;
      const response = <any>await graphql(schema, updateMutation);
      expect(response.data.updateProductDataParse.status).toBe(`Failed`);
    });
  });
