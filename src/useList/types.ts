export interface Options {
  onChange?: (list: any[]) => void;
  defaultList?: any[];
}

export interface List {
  list: any[];
  add: (item: any) => void;
  remove: (item: any | number) => void;
  exchange: (sourceIndex: number, targetIndex: number) => void;
  move: (sourceIndex: number, targetIndex: number) => void;
  setList: (newList: any[]) => void;
}