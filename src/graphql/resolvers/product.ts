import {
  Product,
  ProductObject,
  ProductUpdateObject
} from "./../../entities/product";

// queries:
export const getAllProductsResolver = async (__: any, args: any) => {
  const { sortBy, method, head } = args;
  let result = await Product.getAll({ sortBy, method });
  if (head) result = result.slice(0, head);
  return result;
};
export const getProductResolver = async (__: any, args: any) => {
  const { productId } = args;
  return await Product.getById(productId);
};

// ---------------------------------------------------------
// mutations:
export const createProductResolver = async (__: any, args: any) => {
  try {
    const data: ProductObject = args.productInput;
    const product = await new Product(data).save();
    return { status: 1, product };
  } catch (error) {
    return { status: 0, errors: error.toString() };
  }
};

export const updateProductResolver = async (__: any, args: any) => {
  try {
    const { productId, productName } = args;
    if (productId === undefined && productName === undefined)
      throw new Error("give id or name");
    const data: ProductUpdateObject = {
      inventoryLevel: args.productUpdateInput.inventoryLevel
    };
    let product: Product = new Product(
      productName
        ? await Product.getByName(productName)
        : await Product.getById(productId)
    );
    product = await product.update(data);
    return { status: 1, product };
  } catch (error) {
    return { status: 0, errors: error.toString() };
  }
};

export const deleteProductResolver = async (__: any, args: any) => {
  try {
    const { productId, productName } = args;
    const product: Product = new Product(
      productName
        ? await Product.getByName(productName)
        : await Product.getById(productId)
    );
    await product.delete();
    return { status: 1 };
  } catch (error) {
    return { status: 0, errors: error.toString() };
  }
};
