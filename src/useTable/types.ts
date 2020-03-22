import { Options as UseFetchOptions } from '../useFetch/types';

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface Params {
  [key: string]: any;
}

export type DataSource = { [key: string]: any }[];

export interface Options {
  defaultParams?: any;// 默认参数
  useFetchOptions?: UseFetchOptions;// useFetch 配置
  enableRowSelection?: boolean;// 开启选择
  enableFakePagination?: boolean;// 开启伪分页
  enableSuccessLog?: boolean;// 开启成功日志
  enableFailLog?: boolean;// 开启失败日志
  transfrom?: (data: any, pagination?: Pagination) => {// 转换响应
    pagination: Pagination,
    list: DataSource,
  };
  transfromParams?: (params: any) => any;// 转换请求
}

interface TableProps {
  dataSource: DataSource,
  pagination?: Pagination | boolean,
  loading?: boolean,
  onChange?: (pagination: Pagination, sorter: {
    field: string,
    order: string,
  }) => void,
  rowSelection?: any;
  [key: string]: any,
}

export interface Table {
  params: Params;
  searchFields: Params;
  props: TableProps;
  search: (...args: any[]) => Promise<any>,
  research: (...args: any[]) => Promise<any>,
  reset: () => void,
  clearSelectedRowKeys?: () => void,
}

export interface TableFetch {
  params: Params;
  data: any;
  loading: boolean;
  setParams: (params: Params) => void;
  fetch: (params: Params) => Promise<any>;
  search: (...args: any[]) => Promise<any>;
  research: (...args: any[]) => Promise<any>;
  reset: () => void;
}