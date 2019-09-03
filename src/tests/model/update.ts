import { Product, ProductObject } from "./../../entities/product";
import { init, jDestroy } from "../../config";

export const updateProduct = () =>
  describe("Test: Update a Product", () => {
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

    test(`update a exist Product`, async () => {
      let product: Product = await Product.getByName("test");
      const d = product.date;
      await product.update({ inventoryLevel: 5 });
      product = await Product.getByName("test");
      expect(product.inventoryLevel).toBe(5);
      expect(product.date).toBe(d);
    });

    test(`update an un-exist Product`, async () => {
      const product: Product = await Product.getByName("test2");
      product.productName = "test323232";
      await expect(product.update({ inventoryLevel: 2 })).rejects.toThrow(
        `Can't find dataPath: /test323232. Stopped at test323232`
      );
    });
  });
