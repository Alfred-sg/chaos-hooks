import { useState } from 'react';
import { Options } from './types';

const useFetch = (request: (...args: any[]) => Promise<any>, options?: Options) => {
  const { 
    manual, 
  } = options || {} as Options;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState();

  const fetch = (...args: any[]) => {
    setLoading(true);
    return request(...args).then((res: any) => {
      setLoading(false);
      setData(res);
    })
  }

  if (!manual) fetch();

  return {
    fetch,
    loading,
    data,
  }
}

export default useFetch;
