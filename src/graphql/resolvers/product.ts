import { DataUpdateObject, Data } from "./../../entities/data";
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

export const ProductsFilterResolver = async (__: any, args: any) => {
  // todo
  const { names, dateStart, dateEnd } = args;
  if (names === undefined) throw new Error("give names");
  const result: any = [];
  for (const i of names) {
    const product: Product = await Product.getByName(i);
    const productName = product.productName;
    let data = product.data;
    if (dateStart !== -1 && dateEnd === -1)
      data = data.filter(d => d.date >= dateStart);
    else if (dateStart === -1 && dateEnd !== -1)
      data = data.filter(d => d.date <= dateEnd);
    else if (dateStart !== -1 && dateEnd !== -1)
      data = data.filter(d => d.date <= dateEnd && d.date >= dateStart);
    data.forEach(d => {
      const date = new Date(d.date).toLocaleString();
      // const date = d.date;
      const inventoryLevel = d.inventoryLevel;
      result.push({
        productName,
        date,
        inventoryLevel
      });
    });
  }
  return result;
};

export const ProductsViewResolver = async (__: any, args: any) => {
  // todo
  const { names, filter } = args;
  if (names === undefined) throw new Error("give names");
  let result: any = [];
  for (const i of names) {
    const product: Product = await Product.getByName(i);
    const productName = product.productName;
    const productId = product.productId;
    const data = product.data;
    data.forEach(d => {
      // const date = new Date(d.date).toLocaleString();
      const date = d.date;
      const inventoryLevel = d.inventoryLevel;
      result.push({
        productId,
        productName,
        date,
        inventoryLevel
      });
    });
  }
  // this part can opt later.
  if (
    filter.date &&
    filter.date.dateStart &&
    filter.date.dateEnd &&
    filter.date.dateStart !== -1 &&
    filter.date.dateEnd !== -1
  )
    result = result.filter((i: any) => {
      return i.date >= filter.date.dateStart && i.date <= filter.date.dateEnd;
    });
  if (filter.level && filter.level !== -1)
    result = result.filter((i: any) => {
      return i.inventoryLevel === filter.level;
    });
  return result;
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

export const deleteDataFromProductResolver = async (__: any, args: any) => {
  try {
    const { productId, productName, date } = args;
    const product: Product = new Product(
      productName
        ? await Product.getByName(productName)
        : await Product.getById(productId)
    );
    const index = product.data.findIndex((i: Data) => i.date === date);
    product.data.splice(index, 1);
    await product.update();
    return { status: 1 };
  } catch (error) {
    return { status: 0, errors: error.toString() };
  }
};
