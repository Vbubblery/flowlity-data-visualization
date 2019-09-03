import { jGetAll, jUpdate, jDelete } from "./../config/index";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsIn,
  IsOptional,
  validate,
  Min,
  Max
} from "class-validator";
import { jSave, jGetByKey } from "../config";

export interface ProductObject {
  productId?: string;
  productName: string;
  date: number;
  inventoryLevel: number;
}

export interface ProductUpdateObject {
  date?: number;
  inventoryLevel?: number;
}

export enum sortName {
  date = "date",
  inventoryLevel = "inventoryLevel"
}

export enum sortMethod {
  DESC = "DESC",
  ASC = "ASC"
}

export interface SortObject {
  sortBy: sortName;
  method: sortMethod;
}

export class Product {
  constructor(params: ProductObject) {
    this.productId = params.productId || undefined;
    this.productName = params.productName;
    this.date = params.date;
    this.inventoryLevel = params.inventoryLevel;
  }

  async save() {
    const errs = await validate(this);
    if (errs.length !== 0) throw new Error("Check your input");
    return jSave(this);
  }

  async update(params: ProductUpdateObject) {
    const newProduct = new Product({ ...this, ...params });
    const errs = await validate(newProduct);
    if (errs.length !== 0) throw new Error("Check your input");
    return jUpdate(newProduct);
  }

  delete() {
    return jDelete(this.productName);
  }

  static async getAll(sort?: SortObject) {
    let result = await jGetAll();
    if (sort && sort.method === "ASC") {
      result = result.sort((a: any, b: any) => a[sort.sortBy] - b[sort.sortBy]);
    }
    if (sort && sort.method === "DESC") {
      result = result.sort((a: any, b: any) => b[sort.sortBy] - a[sort.sortBy]);
    }
    return result;
  }

  static async filter() {
    return await jGetAll();
  }

  static async head(value: number) {
    return (await this.getAll()).slice(0, value);
  }

  static getByName(productName: string) {
    return jGetByKey(productName);
  }
  static async getById(productId: string) {
    const result = (<Product[]>await jGetAll()).find(
      i => i.productId === productId
    );
    if (!result) throw new Error("Make sure the Id is correct.");
    return result;
  }

  @IsOptional()
  @IsString()
  public productId?: string;

  @IsNotEmpty()
  @IsString()
  public productName!: string;

  // timestamp
  @IsNotEmpty()
  @Min(1000000000000)
  @Max(+new Date() + 86400000)
  @IsNumber()
  public date!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1, 2, 3, 4, 5])
  public inventoryLevel!: number;
}
