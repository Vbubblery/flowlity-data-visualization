import schema from "../../../graphql/schema";
import { graphql } from "graphql";
import { init, jDestroy } from "../../../config";
import { Product } from "../../../entities/product";

export const readProductGraphqlTest = () =>
  describe("Test product read Graphql", () => {
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

    test("read all products", async () => {
      const query = `query{
        products{
          productId
          productName
          date
          inventoryLevel
        }
      }`;

      const response = <any>await graphql(schema, query);
      expect(response.data.products.length).toBe(3);
    });

    test("read head 2 products", async () => {
      const query = `query{
        products(head:2){
          productId
          productName
          date
          inventoryLevel
        }
      }`;

      const response = <any>await graphql(schema, query);
      expect(response.data.products.length).toBe(2);
    });
    test("read and sort products: date and desc", async () => {
      const query = `query{
        products(sortBy:date,method:DESC){
          productId
          productName
          date
          inventoryLevel
        }
      }`;

      const response = <any>await graphql(schema, query);
      expect(response.data.products[0].productName).toBe("test3");
    });
    test("read and sort products: date and asc", async () => {
      const query = `query{
        products(sortBy:date,method:ASC){
          productId
          productName
          date
          inventoryLevel
        }
      }`;

      const response = <any>await graphql(schema, query);
      expect(response.data.products[0].productName).toBe("test");
    });
    test("read and sort products: inventoryLevel and desc", async () => {
      const query = `query{
        products(sortBy:date,method:DESC){
          productId
          productName
          date
          inventoryLevel
        }
      }`;

      const response = <any>await graphql(schema, query);
      expect(response.data.products[0].productName).toBe("test3");
    });
    test("read and sort products: inventoryLevel and asc", async () => {
      const query = `query{
        products(sortBy:date,method:ASC){
          productId
          productName
          date
          inventoryLevel
        }
      }`;

      const response = <any>await graphql(schema, query);
      expect(response.data.products[0].productName).toBe("test");
    });
  });
