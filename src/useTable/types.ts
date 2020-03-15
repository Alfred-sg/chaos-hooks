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
  defaultParams?: any,
  useFetchOptions?: UseFetchOptions,
  enableRowSelection?: boolean,
  enableFakePagination?: boolean,
  enableSuccessLog?: boolean,
  enableFailLog?: boolean,
  transfrom?: (data: any, pagination?: Pagination) => {
    pagination: Pagination,
    list: DataSource,
  };
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