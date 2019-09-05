import { DataUpdateObject } from "./../../entities/data";
import { Product, ProductObject } from "./../../entities/product";

// queries:
export const getAllProductsResolver = async (__: any, args: any) => {
  return await Product.getAll(args.head);
};

export const getProductResolver = async (__: any, args: any) => {
  const { productId, productName, sortBy, method } = args;
  if (productId === undefined && productName === undefined)
    throw new Error("give id or name");
  let product: Product = new Product(
    productName
      ? await Product.getByName(productName)
      : await Product.getById(productId)
  );
  if (sortBy !== undefined && method !== undefined)
    product = product.dataSort({ sortBy, method });
  return product;
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
export const addDataResolver = async (__: any, args: any) => {
  try {
    const { productId, productName, dataInput } = args;
    if (productId === undefined && productName === undefined)
      throw new Error("give id or name");
    let product: Product = new Product(
      productName
        ? await Product.getByName(productName)
        : await Product.getById(productId)
    );

    product = await product.addNewData(dataInput);

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
    const data: DataUpdateObject = {
      date: args.productUpdateInput.date,
      inventoryLevel: args.productUpdateInput.inventoryLevel
    };
    let product: Product = new Product(
      productName
        ? await Product.getByName(productName)
        : await Product.getById(productId)
    );
    product = await product.updateData(data);
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
