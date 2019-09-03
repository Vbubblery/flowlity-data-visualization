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
      await new Product({
        productName: "test4",
        date: +new Date(),
        inventoryLevel: 4
      }).save();
      await new Product({
        productName: "test5",
        date: +new Date(),
        inventoryLevel: 5
      }).save();
      await new Product({
        productName: "test6",
        date: +new Date(),
        inventoryLevel: 5
      }).save();
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test(`Read top N Products`, async () => {
      const product = await Product.head(3);
      expect(product.length).toBe(3);
    });
    test(`Read top 0 Products`, async () => {
      const product = await Product.head(0);
      expect(product.length).toBe(0);
    });
    test(`Read top N Products more than length`, async () => {
      const product = await Product.head(30);
      expect(product.length).toBe(6);
    });

    test(`Read Products, sort date with desc`, async () => {
      const products: Product[] = <any>(
        await Product.getAll({ sortBy: sortName.date, method: sortMethod.DESC })
      );
      expect(products[0].productName).toBe("test6");
    });
    test(`Read Products, sort date with asc`, async () => {
      const products: Product[] = <any>(
        await Product.getAll({ sortBy: sortName.date, method: sortMethod.ASC })
      );
      expect(products[0].productName).toBe("test");
    });
    test(`Read Products, sort inventoryLevel with desc`, async () => {
      const products: Product[] = <any>await Product.getAll({
        sortBy: sortName.inventoryLevel,
        method: sortMethod.DESC
      });
      expect(products[0].inventoryLevel).toBe(5);
      expect(products[1].inventoryLevel).toBe(5);
      expect(products[2].inventoryLevel).toBe(4);
      expect(products[3].inventoryLevel).toBe(3);
    });
    test(`Read Products, sort inventoryLevel with asc`, async () => {
      const products: Product[] = <any>await Product.getAll({
        sortBy: sortName.inventoryLevel,
        method: sortMethod.ASC
      });
      expect(products[0].inventoryLevel).toBe(1);
      expect(products[1].inventoryLevel).toBe(2);
      expect(products[2].inventoryLevel).toBe(3);
      expect(products[3].inventoryLevel).toBe(4);
    });
  });
