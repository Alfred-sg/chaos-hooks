import useBaseTable from './uses/useBaseTable';
import useRowSelection from './uses/useRowSelection';
import { Options, Table } from './types';

const useTable = (
  request: (...args: any[]) => Promise<any>, 
  options: Options = {} as Options,
): Table => {
  const { enableRowSelection } = options;
  const table = useBaseTable(request, options);

  // 添加复选框功能
  if (enableRowSelection) useRowSelection(table);

  return table;
};

export default useTable;
