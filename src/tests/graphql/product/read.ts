import schema from "../../../graphql/schema";
import { graphql } from "graphql";
import { init, jDestroy } from "../../../config";
import { Product } from "../../../entities/product";

export const readProductGraphqlTest = () =>
  describe("Test product read Graphql", () => {
    beforeAll(async () => {
      await init("test_db");
      const product: Product = await new Product({
        productId: "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed",
        productName: "test"
      }).save();
      await new Product({
        productName: "test2"
      }).save();
      await new Product({
        productName: "test3"
      }).save();
      await product.addNewData({ date: 1567643690771, inventoryLevel: 1 });
      await product.addNewData({ date: 1567643690772, inventoryLevel: 2 });
      await product.addNewData({ date: 1567643690773, inventoryLevel: 3 });
      await product.addNewData({ date: 1567643690774, inventoryLevel: 4 });
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test("read all products", async () => {
      const query = `query {
        products {
          productId
          productName
          data {
            date
            inventoryLevel
          }
        }
      }
      `;

      const response = <any>await graphql(schema, query);
      expect(response.data.products.length).toBe(3);
    });

    test("read head 2 products", async () => {
      const query = `query {
        products(head:2) {
          productId
          productName
          data {
            date
            inventoryLevel
          }
        }
      }
      `;

      const response = <any>await graphql(schema, query);
      expect(response.data.products.length).toBe(2);
    });

    test("read and sort a product: date and desc", async () => {
      const query = `query {
        product(productName:"test",sortBy:date,method:DESC) {
          productId
          productName
          data {
            date
            inventoryLevel
          }
        }
      }
      `;

      const response = <any>await graphql(schema, query);
      // console.log(response);

      expect(response.data.product.data[0].date).toBe(1567643690774);
    });
    test("read and sort products: date and asc", async () => {
      const query = `query {
        product(productName:"test",sortBy:date,method:ASC) {
          productId
          productName
          data {
            date
            inventoryLevel
          }
        }
      }
      `;

      const response = <any>await graphql(schema, query);
      expect(response.data.product.data[0].date).toBe(1567643690771);
    });
    test("read and sort products: inventoryLevel and desc", async () => {
      const query = `query {
        product(productName:"test",sortBy:inventoryLevel,method:DESC) {
          productId
          productName
          data {
            date
            inventoryLevel
          }
        }
      }
      `;

      const response = <any>await graphql(schema, query);
      expect(response.data.product.data[0].inventoryLevel).toBe(4);
    });
    test("read and sort products: inventoryLevel and asc", async () => {
      const query = `query {
        product(productName:"test",sortBy:inventoryLevel,method:ASC) {
          productId
          productName
          data {
            date
            inventoryLevel
          }
        }
      }
      `;

      const response = <any>await graphql(schema, query);
      expect(response.data.product.data[0].inventoryLevel).toBe(1);
    });
  });
