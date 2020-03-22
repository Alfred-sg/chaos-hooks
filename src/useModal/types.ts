import { Options as FormOptions, Fields, Form } from '../useForm/types';

export interface Options {
  enableForm?: boolean;
  formOptions?: FormOptions;
  getValuesFromDataSource?: (dataSource: any) => Fields;
}

export interface Modal {
  visible: boolean;
  dataSource: any;
  show: (record?: any) => void;
  hide: () => void;
  form?: Form;
}