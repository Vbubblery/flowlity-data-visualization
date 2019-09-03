import { Product } from "./../../entities/product";
import { init, jDestroy } from "../../config";

export const deleteProduct = () =>
  describe("Test: Delete a Product", () => {
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

    test(`Delete a Product by name`, async () => {
      const product: Product = await Product.getByName("test2");
      await product.delete();
      const products = await Product.getAll();
      expect(products.length).toBe(2);
    });

    test(`Delete a Product by id`, async () => {
      const product: Product = await Product.getById(
        "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed"
      );
      await product.delete();
      const products = await Product.getAll();
      expect(products.length).toBe(1);
    });
  });
