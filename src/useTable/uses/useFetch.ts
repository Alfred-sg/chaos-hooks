import { useState } from 'react';
import useFetch from '../../useFetch';
import * as logger from '../../logger';
import { Params, Options, TableFetch } from '../types';

const useFetchInTable = (
  request: (...args: any[]) => Promise<any>, 
  options: Options = {} as Options,
): TableFetch => {
  const {
    defaultParams,
    useFetchOptions,
    enableSuccessLog,
    enableFailLog = true,
    transfrom,
    transfromParams,
  } = options;

  const [params, setParams] = useState<Params>({
    ...defaultParams,
  });

  const { fetch, data, loading } = useFetch((...args: any[]) => {
    return request(...args).then((res: any) => {
      if (res && res.success) {
        if (enableSuccessLog) logger.success('查询成功', res);

        return transfrom ? transfrom(res.data) : res.data;
      } else {
        if (enableFailLog) logger.fail('查询失败', res);
      }
    }).catch(err => {
      if (enableFailLog) logger.fail('查询失败', err);
    });
  }, useFetchOptions);

  /**
   * 使用原先的 pageSize 查询
   * @param pms 
   */
  const search = (pms: Params) => {
    const newParams = {
      current: 1,
      pageSize: params.pageSize,
      ...pms,
    };
    const newParamsTransformed = transfromParams ? transfromParams(newParams) : newParams;

    setParams(newParamsTransformed);
    return fetch(newParamsTransformed);
  }

  /**
   * 使用原先的 params 查询
   * @param pms 
   */
  const research = (pms: Params) => {
    const newParams = {
      ...params,
      ...pms,
    };
    const newParamsTransformed = transfromParams ? transfromParams(newParams) : newParams;

    setParams(newParamsTransformed);
    return fetch(newParamsTransformed);
  }

  /**
   * 重置
   */
  const reset = () => {
    setParams(defaultParams);
    return fetch(defaultParams);
  }

  return {
    params,
    data,
    loading,
    setParams,
    fetch,
    search,
    research,
    reset,
  };
}

export default useFetchInTable;
