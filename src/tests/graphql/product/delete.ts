import schema from "../../../graphql/schema";
import { graphql } from "graphql";
import { init, jDestroy } from "../../../config";
import { Product } from "../../../entities/product";

export const deleteProductGraphqlTest = () =>
  describe("Test product delete Graphql", () => {
    beforeAll(async () => {
      await init("test_db");
      const product: Product = await new Product({
        productId: "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed",
        productName: "test"
      }).save();
      await product.addNewData({ date: 1567695422881, inventoryLevel: 1 });
      await product.addNewData({ date: 1567695422882, inventoryLevel: 2 });
      await product.addNewData({ date: 1567695422883, inventoryLevel: 3 });
      await new Product({
        productName: "test2"
      }).save();
      await new Product({
        productName: "test3"
      }).save();
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test("delete a data by product id", async () => {
      const mutation = `
        mutation{
          deleteDataFromProductParse(
            productId: "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed"
            date: 1567695422881
          ) {
            status
          }
        }
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.deleteDataFromProductParse.status).toBe(
        `Successful`
      );
    });

    test("delete a data by product name", async () => {
      const mutation = `
        mutation{
          deleteDataFromProductParse(
            productName: "test"
            date: 1567695422882
          ) {
            status
          }
        }
      `;

      const response = <any>await graphql(schema, mutation);
      expect(response.data.deleteDataFromProductParse.status).toBe(
        `Successful`
      );
    });

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
