import { createProduct } from "./model/create";
import { readProduct } from "./model/read";
import { updateProduct } from "./model/update";
import { deleteProduct } from "./model/delete";
import { readConditionalProduct } from "./model/filter";
import { createProductGraphqlTest } from "./graphql/product/create";
import { updateProductGraphqlTest } from "./graphql/product/update";
import { readProductGraphqlTest } from "./graphql/product/read";
import { deleteProductGraphqlTest } from "./graphql/product/delete";

// merged 1
describe("sequentially run tests", () => {
  createProduct();
  readProduct();
  updateProduct();
  deleteProduct();
  readConditionalProduct();
  createProductGraphqlTest();
  updateProductGraphqlTest();
  readProductGraphqlTest();
  deleteProductGraphqlTest();
});
