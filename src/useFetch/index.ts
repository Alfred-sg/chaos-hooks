import { useState, useCallback, useEffect } from 'react';
import { Options } from './types';

const useFetch = (request: (...args: any[]) => Promise<any>, options?: Options) => {
  const { 
    manual, 
  } = options || {} as Options;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState();

  const fetch = useCallback((...args: any[]) => {
    if (!loading) setLoading(true);
    return request(...args).then((res: any) => {
      if (loading)  setLoading(false);
      setData(res);
    })
  }, []);

  if (!manual){
    useEffect(() => {
      fetch();
    }, []);
  }

  return {
    fetch,
    loading,
    data,
  }
}

export default useFetch;
