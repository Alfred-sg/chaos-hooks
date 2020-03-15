import { useState } from 'react';
import useFetch from './useFetch';
import { defaultPagination } from '../consts';
import { Pagination, DataSource, Options, Table } from '../types';

const defaultTransform = (data: any, pagination?: Pagination): {
  pagination: Pagination,
  list: DataSource,
} => {
  return Array.isArray(data) ? {
    pagination: {
      current: 1,
      pageSize: pagination ? pagination.pageSize : defaultPagination.pageSize,
      total: (data || []).length,
    },
    list: data || [],
  } : {
    pagination: {
      current: data.current,
      pageSize: data.pageSize,
      total: data.total,
    },
    list: data.list || [],
  }
};

const getDataSourceByPagination = (list: any[], pagination: Pagination) => {
  const { current = 0, pageSize = defaultPagination.pageSize, total = 0 } = pagination;
  return (list || []).slice(
    0 + pageSize * (current - 1),
    total < (pageSize * current) ? total : pageSize * current
  );
};

const useBaseTable = (
  request: (...args: any[]) => Promise<any>, 
  options: Options = {} as Options,
): Table => {
  const { enableFakePagination, transfrom = defaultTransform } = options;
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [dataSource, setDataSource] = useState<DataSource>([]);
  const { params, data, loading, setParams, fetch, search, research, reset } = useFetch(request, {
    ...options,
    transfrom: (data: any) => {
      const temp = transfrom(data, pagination);
      setPagination(temp.pagination);
      const dataSource = enableFakePagination ? 
        getDataSourceByPagination(temp.list, temp.pagination) : 
        temp.list;
      setDataSource(dataSource);

      return temp;
    }
  });

  const onChange = (pagination: Pagination, sorter: {
    field: string,
    order: string,
  }) => {
    const { current, pageSize } = pagination;
    if (enableFakePagination){
      if (current !== 1 || (current == 1 && pagination !== 10)){
        const pag = {
          current,
          pageSize,
          total: pagination.total,
        }
        setPagination(pag);
        setDataSource(getDataSourceByPagination((data || {list: []}).list as any[], pag));
      };

      return;
    }

    research({
      current,
      pageSize,
      orderConditions: sorter ? [{
        fieldName: sorter.field,
        sortType: sorter.order,
      }] : undefined,
    })
  }

  const { current, pageSize, ...searchFields } = params;

  return {
    params,
    searchFields,
    props: {
      pagination,
      dataSource,
      loading,
      onChange,
    },
    search,
    research,
    reset,
  };
};

export default useBaseTable;
