import { useState, useCallback, useEffect } from 'react';
import { Options } from './types';

const useList = (options?: Options) => {
  const { onChange, defaultList = [] } = options || {} as Options;
  const [list, setList] = useState<any[]>(defaultList);

  /**
   * 添加一项
   * @param item 
   */
  const add = (item: any) => {
    list.push(item);
    triggerChange([...list]);
  };

  /**
   * 删除一项
   * @param item 
   */
  const remove = (item: any | number) => {
    if ( typeof item === 'number' ){
      list.splice(item, 1);
      triggerChange([...list]);
    } else {
      const newList = list.filter(it => item !== it);
      triggerChange(newList);
    };
  };

  /**
   * 交换位置
   * @param sourceIndex 源节点位置
   * @param targetIndex 目标位置
   */
  const exchange = (sourceIndex: number, targetIndex: number) => {
    const temp = list[sourceIndex];
    list[sourceIndex] = list[targetIndex];
    list[targetIndex] = temp;
    triggerChange([...list]);
  };

  /**
   * 移动
   * @param sourceIndex 
   * @param targetIndex 
   */
  const move = (sourceIndex: number, targetIndex: number) => {
    const source = list.splice(sourceIndex, 1)[0];
    if (sourceIndex < targetIndex){// 下移
      list.splice(targetIndex, 0, source);
    } else {
      list.splice(targetIndex, 0, source);
    };
    
    triggerChange([...list]);
  };

  /**
   * 全量变更
   * @param item 
   */
  const triggerChange = (newList: any[]) => {
    setList(newList);
    onChange && onChange(newList);
  }
  
  return {
    list,
    setList: triggerChange,
    add,
    remove,
    exchange,
    move,
  }
}

export default useList;
