import { createProduct } from "./model/create";
import { readProduct } from "./model/read";
import { updateProduct } from "./model/update";
import { deleteProduct } from "./model/delete";
import { readConditionalProduct } from "./model/filter";
import { createProductGraphqlTest } from "./graphql/product/create";

// merged 1
describe("sequentially run tests", () => {
  // createProduct();
  // readProduct();
  // updateProduct();
  // deleteProduct();
  // readConditionalProduct();
  createProductGraphqlTest();
});
