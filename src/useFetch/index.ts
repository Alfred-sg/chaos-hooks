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
    return new Promise((resolve, reject) => {
      request(...args).then((res: any) => {
        setLoading(false);
        setData(res);
        resolve(res);
      }).catch(err => {
        setLoading(false);
        reject(err);
      })
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
