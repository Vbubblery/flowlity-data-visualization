import { IsNotEmpty, Min, Max, IsNumber, IsIn } from "class-validator";

export interface DataObject {
  date: number;
  inventoryLevel: number;
}

export interface DataUpdateObject {
  date: number;
  inventoryLevel: number;
}

export class Data {
  // timestamp
  constructor(params: DataObject) {
    this.date = params.date;
    this.inventoryLevel = params.inventoryLevel;
  }
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
