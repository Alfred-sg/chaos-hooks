export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface Params extends Pagination {
  [key: string]: any;
}

export interface TableApi {
  current?: number;
  pageSize?: number;
  total?: number;
}

declare const _default: <T = any>(
  request: (params: Object) => Promise<Object>, 
  opts?: {
    useAsyncOptions?: any,
    enableRowSelection?: boolean,
    defaultParams?: Object,
  }
) => {
  params: Params;
};
export default _default;
