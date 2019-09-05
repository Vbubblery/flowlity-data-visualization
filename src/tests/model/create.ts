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
      let product: Product = await new Product({
        productName: "test Product",
        data: []
      }).save();
      product = await product.addNewData({
        date: 1567643690772,
        inventoryLevel: 3
      });
      expect(product.productName).toBe(`test Product`);
      expect(product.productId).not.toBeUndefined();
    });
    test(`Create a correct Product which exist in DB`, async () => {
      const product = new Product({
        productName: "test Product"
      });
      await expect(product.save()).rejects.toThrow(
        "Product Already exist in DB"
      );
    });
    test(`Create a correct Product without ProductName`, async () => {
      // @ts-ignore
      const product: Product = new Product({});
      // @ts-ignore
      await expect(product.save()).rejects.toThrow();
    });

    test(`Create a correct Product without inventoryLevel`, async () => {
      const product: Product = new Product({
        productName: "test new Product"
      });
      await expect(
        // @ts-ignore
        product.addNewData({ date: 1567643690772 })
      ).rejects.toThrow();
    });
    test(`Create a correct Product without Data`, async () => {
      const product: Product = new Product({
        productName: "test Product"
      });
      // @ts-ignore
      product.addNewData({ inventoryLevel: 4 });
      // @ts-ignore
      await expect(product.save()).rejects.toThrow();
    });
    test(`create a incorrect Product, inventoryLevel is out of range [0-5]`, async () => {
      // @ts-ignore
      const product: Product = new Product({
        productName: "test Product2"
      });
      // @ts-ignore
      await expect(
        product.addNewData({ date: 1567643690772, inventoryLevel: 6 })
      ).rejects.toThrow("Check your input");
    });
    test(`create a incorrect Product, inventoryLevel is not a number`, async () => {
      const product: Product = new Product({
        productName: "test Product2"
      });

      await expect(
        // @ts-ignore
        product.addNewData({ date: 1567643690772, inventoryLevel: "6" })
      ).rejects.toThrow("Check your input");
    });
    test(`create a incorrect Product, date is not a timestamp`, async () => {
      const product: Product = new Product({
        productName: "test Product2"
      });
      // @ts-ignore
      await expect(
        product.addNewData({ date: 231, inventoryLevel: 3 })
      ).rejects.toThrow("Check your input");
    });
    test(`create a incorrect Product, date is bigger than today`, async () => {
      const product: Product = new Product({
        productName: "test Product2"
      });
      // @ts-ignore
      await expect(
        product.addNewData({ date: 999999999999999, inventoryLevel: 3 })
      ).rejects.toThrow("Check your input");
    });
  });
