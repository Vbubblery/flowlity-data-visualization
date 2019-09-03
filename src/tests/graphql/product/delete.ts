import schema from "../../../graphql/schema";
import { graphql } from "graphql";
import { init, jDestroy } from "../../../config";
import { Product } from "../../../entities/product";

export const deleteProductGraphqlTest = () =>
  describe("Test product delete Graphql", () => {
    beforeAll(async () => {
      await init("test_db");
      await new Product({
        productId: "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed",
        productName: "test",
        date: +new Date(),
        inventoryLevel: 1
      }).save();
      await new Product({
        productName: "test2",
        date: +new Date(),
        inventoryLevel: 2
      }).save();
      await new Product({
        productName: "test3",
        date: +new Date(),
        inventoryLevel: 3
      }).save();
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test("delete a product by id", async () => {
      const mutation = `mutation {
        deleteProductParse(productId: "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed") {
          status
          errors
        }
      }
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.deleteProductParse.status).toBe(`Successful`);
    });
    test("delete a product by name", async () => {
      const mutation = `mutation {
        deleteProductParse(productName: "test3") {
          status
          errors
        }
      }
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.deleteProductParse.status).toBe(`Successful`);
    });
  });
