import { RuleItem } from 'async-validator';

export interface FieldMeta {
  initialValue?: any;// 初始值
  trigger?: string;// 收集字段的事件
  valuePropName?: string;// 字段值的 props 属性
  getValueFromEvent?: (...args: any[]) => any;// 灌入 store 的值
  normalize?: (value: any) => any;// 将值序列化后灌入字段组件
  rules?: RuleItem[];// 字段校验规则
  validateFirst?: boolean;// 校验失败后是否阻止其他字段校验
  validateTrigger?: string;// 校验字段的事件
  fieldRef?: any;// 字段组件 ref
  [key: string]: any;
}

export interface Fields {
  [name: string]: any;
}

export interface Errors {
  [name: string]: string[];
}

export interface Options {
  onValuesChange?: (values: Fields) => void;
}

export interface Form {
  registerField: (name: string, meta?: FieldMeta) => void;
  unRegisterField: (name: string) => void;
  setFieldMeta: (name: string, key: string | any, value?: any) => void;
  getFieldMeta: (name: string, key?: string) => any;
  getFieldDecorator: (name: string, meta: FieldMeta) => (inst: React.ReactElement) => React.ReactElement;
  getFieldRef: (name: string) => any;
  getFieldsValue: () => Fields;
  getFieldValue: (name: string) => any;
  getFieldInitialValue: (name: string) => any;
  getFieldsError: () => Errors;
  getFieldError: (name: string) => undefined | string[];
  setFieldValue: (name: string, value: any) => void;
  setFieldsValue: (vals: Fields) => void;
  resetFields: () => void;
  validateField: (name: string, value?: any) => Promise<Fields>;
  validateFields: (names?: string[]) => Promise<Fields>;
  isFormChanged: () => boolean;
  isFieldTouched: (name: string) => boolean;
  isFieldsTouched: () => boolean;
}