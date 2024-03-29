import { IParamsRequest } from "./ICommon";

export interface IPagedFoodRequest extends IParamsRequest {}

export interface ICreateRequest {
  foodName: string;
  foodDescription: string;
  foodPrice: number;
}
export interface IUpdateRequest {
  id: number;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
}

export interface IInput {
  label: string;
  placeholder: string;
}

export interface IInputObject {
  foodName: IInput;
  foodDescription: IInput;
  foodPrice: IInput;
}
