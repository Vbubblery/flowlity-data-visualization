import { Product } from "./../entities/product";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

import v1 from "uuid";

let db: any;

export const init = async (name: string) => {
  db = await new JsonDB(new Config(name, true, true, "/"));
};

export const jSave = async (product: Product) => {
  try {
    await db.getData(`/${product.productName}`);
  } catch (error) {
    if (!product.productId) product.productId = v1();
    await db.push(`/${product.productName}`, product);
    return db.getData(`/${product.productName}`);
  }
  throw new Error("Product Already exist in DB");
};

export const jGetByKey = async (key: string) => {
  return db.getData(`/${key}`);
};

export const jGetAll = async () => {
  return Object.values(db.getData(`/`));
};

export const jUpdate = async (product: Product) => {
  try {
    await db.getData(`/${product.productName}`);
    // The data will not be overrided.
    await db.push(`/${product.productName}`, product, true);
    return product;
  } catch (error) {
    throw error;
  }
};

export const jDelete = async (key: string) => {
  return db.delete(`/${key}`);
};

export const jDestroy = async () => {
  return db.delete("/");
};
