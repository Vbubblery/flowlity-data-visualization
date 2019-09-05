import { Product, ProductObject } from "./../../entities/product";
import { init, jDestroy } from "../../config";

export const updateProduct = () =>
  describe("Test: Update a Product", () => {
    beforeAll(async () => {
      init("test_db");
      await new Product({
        productId: "2b01dbe3-4b0b-4baf-8ed5-58e818a0a8ed",
        productName: "test",
        data: [{ date: 1567643690772, inventoryLevel: 2 }]
      }).save();
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

    test(`update a exist Product`, async () => {
      let product: Product = await Product.getByName("test");
      await product.updateData({ date: 1567643690772, inventoryLevel: 5 });
      product = await Product.getByName("test");
      expect(product.data[0].inventoryLevel).toBe(5);
      expect(product.data[0].date).toBe(1567643690772);
    });
  });
