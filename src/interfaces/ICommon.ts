export interface IPaginationResponse<T> {
  pageNo: number;
  pageSize: number;
  totalPages: number;
  data: T[];
}

export interface IParamsRequest {
  pageNo: number;
  pageSize: number;
  keyword: string;
}
