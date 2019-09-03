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
              date: 1567543553562
              inventoryLevel: 1
            }
          ) {
            status
            errors
            product {
              productId
              productName
              date
              inventoryLevel
            }
          }
        }
      `;

      await graphql(schema, mutation);
      const updateMutation = `mutation {
        updateProductParse(
          productName: "bubble"
          productUpdateInput: { inventoryLevel: 4 }
        ) {
          status
          product {
            inventoryLevel
          }
        }
      }
      `;
      const response = <any>await graphql(schema, updateMutation);
      expect(response.data.updateProductParse.status).toBe(`Successful`);
      expect(response.data.updateProductParse.product.inventoryLevel).toBe(4);
    });
    test("update a product with incorrect infos:out of range", async () => {
      const updateMutation = `mutation {
        updateProductParse(
          productName: "bubble"
          productUpdateInput: { inventoryLevel: 14 }
        ) {
          status
          product {
            inventoryLevel
          }
        }
      }
      `;
      const response = <any>await graphql(schema, updateMutation);
      expect(response.data.updateProductParse.status).toBe(`Failed`);
    });
    test("update a product with incorrect infos: is string", async () => {
      const updateMutation = `mutation {
        updateProductParse(
          productName: "bubble"
          productUpdateInput: { inventoryLevel: "14" }
        ) {
          status
          product {
            inventoryLevel
          }
        }
      }
      `;
      const response = <any>await graphql(schema, updateMutation);
      expect(response.data).toBeUndefined();
    });
    test("update a product with incorrect infos: name is wrong", async () => {
      const updateMutation = `mutation {
        updateProductParse(
          productName: "bubble23"
          productUpdateInput: { inventoryLevel: 4 }
        ) {
          status
          product {
            inventoryLevel
          }
        }
      }
      `;
      const response = <any>await graphql(schema, updateMutation);
      expect(response.data.updateProductParse.status).toBe(`Failed`);
    });
  });
