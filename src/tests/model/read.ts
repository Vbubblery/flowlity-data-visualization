import { Product, ProductObject } from "./../../entities/product";
import { init, jDestroy } from "../../config";

export const readProduct = () =>
  describe("Test: Create a Product", () => {
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
    });
    afterAll(async () => {
      jDestroy();
    });
    afterEach(async () => {});

    test(`Read all Products`, async () => {
      const product = await Product.getAll();
      expect(product.length).toBe(3);
    });

    test(`Read a Product from DB by product name`, async () => {
      const product = await Product.getByName("test");
      expect(product.productName).toBe("test");
      expect(product.inventoryLevel).toBe(1);
    });

    test(`Read an un-exist Product from DB by product name`, async () => {
      expect(Product.getByName("test22")).rejects.toThrow(
        `Can't find dataPath: /test22. Stopped at test22`
      );
    });

    test(`Read a Product from DB by product id`, async () => {
      const product = await Product.getById(
        "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed"
      );
      expect(product.productName).toBe("test");
      expect(product.inventoryLevel).toBe(1);
    });
    test(`Read an un-exist from DB by product id`, async () => {
      await expect(
        Product.getById("2b02dbe3-4b0b-4baf-8ed5-58e818a0a8ed")
      ).rejects.toThrow("Make sure the Id is correct.");
    });
  });
