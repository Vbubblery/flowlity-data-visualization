import { jGetAll, jUpdate, jDelete } from "./../config/index";
import { IsNotEmpty, IsString, IsOptional, validate } from "class-validator";
import { jSave, jGetByKey } from "../config";
import { Data, DataObject } from "./data";

export interface ProductObject {
  productId?: string;
  productName: string;
  data?: Data[];
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
    this.data = params.data || [];
  }

  async save() {
    const errs = await validate(this);
    if (errs.length !== 0) throw new Error("Check your input");
    return jSave(this);
  }
  async addNewData(params: DataObject) {
    // todo
    if (this.data.find(i => i.date === params.date))
      throw new Error("date duplicated.");
    const data = new Data(params);
    const errs = await validate(data);
    if (errs.length !== 0) throw new Error("Check your input");
    this.data.push(data);
    return jUpdate(this);
  }

  async updateData(params: DataObject) {
    const data = new Data(params);
    const errs = await validate(data);
    if (errs.length !== 0) throw new Error("Check your input");
    const index = this.data.findIndex(i => i.date === data.date);
    this.data[index] = data;
    return jUpdate(this);
  }

  delete() {
    return jDelete(this.productName);
  }

  // static async getAll(sort?: SortObject) {
  static async getAll(head?: number) {
    if (head === 0) return [];
    let result = await jGetAll();
    // if (sort && sort.method === "ASC") {
    //   result = result.sort((a: any, b: any) => a.data[sort.sortBy] - b.data[sort.sortBy]);
    // }
    // if (sort && sort.method === "DESC") {
    //   result = result.sort((a: any, b: any) => b.data[sort.sortBy] - a.data[sort.sortBy]);
    // }
    if (head) result = result.slice(0, head);
    return result;
  }
  dataSort(sort: SortObject) {
    if (sort && sort.method === "ASC") {
      this.data = this.data.sort(
        (a: any, b: any) => a[sort.sortBy] - b[sort.sortBy]
      );
    }
    if (sort && sort.method === "DESC") {
      this.data = this.data.sort(
        (a: any, b: any) => b[sort.sortBy] - a[sort.sortBy]
      );
    }
    return this;
  }
  // static async dataHead(value: number,productName: string) {
  //   return (await this.getByName(productName)).data.slice(0, value);
  // }
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

  public data: Data[];
}
