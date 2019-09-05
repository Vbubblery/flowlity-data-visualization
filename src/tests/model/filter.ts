import { product } from "./../../graphql/queries/product";
import {
  Product,
  ProductObject,
  sortName,
  sortMethod
} from "./../../entities/product";
import { init, jDestroy } from "../../config";

export const readConditionalProduct = () =>
  describe("Test: Create Conditional Product", () => {
    beforeAll(async () => {
      init("test_db");

      await new Product({
        productId: "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed",
        productName: "test",
        data: [
          { date: +new Date(), inventoryLevel: 1 },
          { date: +new Date() + 20, inventoryLevel: 2 },
          { date: +new Date() + 30, inventoryLevel: 3 },
          { date: +new Date() + 40, inventoryLevel: 4 }
        ]
      }).save();
      await new Product({
        productName: "test2",
        data: [{ date: +new Date(), inventoryLevel: 2 }]
      }).save();
      await new Product({
        productName: "test3",
        data: [{ date: +new Date(), inventoryLevel: 3 }]
      }).save();
      await new Product({
        productName: "test4",
        data: [{ date: +new Date(), inventoryLevel: 4 }]
      }).save();
      await new Product({
        productName: "test5",
        data: [{ date: +new Date(), inventoryLevel: 5 }]
      }).save();
      await new Product({
        productName: "test6",
        data: [{ date: +new Date(), inventoryLevel: 5 }]
      }).save();
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test(`Read top N Products`, async () => {
      const product = await Product.getAll(3);
      expect(product.length).toBe(3);
    });
    test(`Read top 0 Products`, async () => {
      const product = await Product.getAll(0);
      expect(product.length).toBe(0);
    });
    test(`Read top N Products more than length`, async () => {
      const product = await Product.getAll(30);
      expect(product.length).toBe(6);
    });

    test(`Read Products, sort date with desc`, async () => {
      const product = (<Product>(
        (<any>await Product.getByName("test"))
      )).dataSort({ sortBy: sortName.date, method: sortMethod.DESC });
      expect(product.data[0].inventoryLevel).toBe(4);
    });
    test(`Read a Products, sort date with asc`, async () => {
      const product = (<Product>(
        (<any>await Product.getByName("test"))
      )).dataSort({ sortBy: sortName.date, method: sortMethod.ASC });
      expect(product.data[0].inventoryLevel).toBe(1);
    });
    test(`Read Products, sort inventoryLevel with desc`, async () => {
      const product = (<Product>(
        (<any>await Product.getByName("test"))
      )).dataSort({ sortBy: sortName.inventoryLevel, method: sortMethod.DESC });
      expect(product.data[0].inventoryLevel).toBe(4);
    });
    test(`Read Products, sort inventoryLevel with asc`, async () => {
      const product = (<Product>(
        (<any>await Product.getByName("test"))
      )).dataSort({ sortBy: sortName.inventoryLevel, method: sortMethod.ASC });
      expect(product.data[0].inventoryLevel).toBe(1);
    });
  });
