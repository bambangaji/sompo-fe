
export interface ApiResponse<T> {
  data: T;
  meta: {
    status: number;
    message: string;
  };
}

export interface ICat {
  id: string;
  url: string;
  width: Number;
  height: Number;
  createdAt: Date;
}
export interface IListCatResponse {
  totalItems: number;
  cats: ICat[];
  totalPages: number;
  currentPage: number;
}
