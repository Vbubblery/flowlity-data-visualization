import { Product, ProductObject } from "./../../entities/product";
import { init, jDestroy } from "../../config";

export const createProduct = () =>
  describe("Test: Create a Product", () => {
    beforeAll(async () => {
      init("test_db");
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test(`Create a correct Product which doesn't exist in DB`, async () => {
      const product: ProductObject = await new Product({
        productName: "test Product",
        date: +new Date(),
        inventoryLevel: 5
      }).save();
      expect(product.productName).toBe(`test Product`);
      expect(product.date).not.toBeUndefined();
      expect(product.productId).not.toBeUndefined();
      expect(product.inventoryLevel).toBe(5);
    });
    test(`Create a correct Product which exist in DB`, async () => {
      const product = new Product({
        productName: "test Product",
        date: +new Date(),
        inventoryLevel: 3
      });
      await expect(product.save()).rejects.toThrow(
        "Product Already exist in DB"
      );
    });
    test(`Create a correct Product without ProductName`, async () => {
      // @ts-ignore
      const product: ProductObject = new Product({
        date: +new Date(),
        inventoryLevel: 5
      });
      // @ts-ignore
      await expect(product.save()).rejects.toThrow();
    });

    test(`Create a correct Product without inventoryLevel`, async () => {
      // @ts-ignore
      const product: ProductObject = new Product({
        productName: "test new Product",
        date: +new Date()
      });
      // @ts-ignore
      await expect(product.save()).rejects.toThrow();
    });
    test(`Create a correct Product without Date`, async () => {
      // @ts-ignore
      const product: ProductObject = new Product({
        productName: "test Product",
        inventoryLevel: 3
      });
      // @ts-ignore
      await expect(product.save()).rejects.toThrow();
    });
    test(`create a incorrect Product, inventoryLevel is out of range [0-5]`, async () => {
      // @ts-ignore
      const product: ProductObject = new Product({
        productName: "test Product2",
        date: +new Date(),
        inventoryLevel: 9
      });
      // @ts-ignore
      await expect(product.save()).rejects.toThrow("Check your input");
    });
    test(`create a incorrect Product, inventoryLevel is not a number`, async () => {
      const product: ProductObject = new Product({
        productName: "test Product2",
        date: +new Date(),
        // @ts-ignore
        inventoryLevel: "9"
      });
      // @ts-ignore
      await expect(product.save()).rejects.toThrow("Check your input");
    });
    test(`create a incorrect Product, date is not a timestamp`, async () => {
      const product: ProductObject = new Product({
        productName: "test Product2",
        date: 32132132,
        inventoryLevel: 3
      });
      // @ts-ignore
      await expect(product.save()).rejects.toThrow("Check your input");
    });
    test(`create a incorrect Product, date is bigger than today`, async () => {
      const product: ProductObject = new Product({
        productName: "test Product2",
        date: 9999999999999,
        inventoryLevel: 3
      });
      // @ts-ignore
      await expect(product.save()).rejects.toThrow("Check your input");
    });
  });
