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

      const response = <any>await graphql(schema, mutation);
      expect(response.data.createProductParse.status).toBe(`Successful`);
    });
    test("create new product with incorrect infos: name is empty", async () => {
      const mutation = `
        mutation {
          createProductParse(
            productInput: {
              productName: ""
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

      const response = <any>await graphql(schema, mutation);
      expect(response.data.createProductParse.status).toBe(`Failed`);
    });
    test("create new product with incorrect infos: date is failed", async () => {
      const mutation = `
        mutation {
          createProductParse(
            productInput: {
              productName: ""
              date: 156754355356223
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

      const response = <any>await graphql(schema, mutation);
      expect(response.data.createProductParse.status).toBe(`Failed`);
    });
    test("create new product with incorrect infos: inventoryLevel", async () => {
      const mutation = `
        mutation {
          createProductParse(
            productInput: {
              productName: ""
              date: 1567543553562
              inventoryLevel: 11
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

      const response = <any>await graphql(schema, mutation);
      expect(response.data.createProductParse.status).toBe(`Failed`);
    });
  });
