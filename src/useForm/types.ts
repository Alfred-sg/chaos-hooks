import { ValidateSource, RuleItem } from 'async-validator';

export interface FieldMeta {
  validateFirst?: boolean;
  initialValue?: any;
  rules?: RuleItem[];
  trigger?: string;
  validateTrigger?: string;
  valuePropName?: string;
  [key: string]: any;
}

export interface Errors {
  [key: string]: string[];
}

export interface Form {
  getFieldDecorator: (name: string, meta: FieldMeta) => (inst: React.ReactElement) => React.ReactElement;
  getFieldsValue: () => ValidateSource;
  getFieldValue: (name: string) => any;
  getFieldsError: () => Errors;
  getFieldError: (name: string) => string[];
  setFieldsValue: (vals: ValidateSource) => void;
  resetFields: (names: string[]) => void;
  validateFields: (names?: string[]) => Promise<ValidateSource>;
}