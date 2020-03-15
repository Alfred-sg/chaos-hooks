import React, { useContext } from 'react';
import { List, Picker } from 'antd-mobile';
import FormItem from './FormItem';
import Context from './Context';

export default ({
  name,
  options,
  label,
  labelAddon,
  required = true,
  initialValue,
  rules,
  ...rest
}: {
  name: string,
  options: any,
  label: string,
  labelAddon?: React.ReactNode,
  required?: boolean,
  initialValue?: any;
  rules?: any,
  [key: string]: any,
}) => {
  const {
    getFieldDecorator,
    setFieldsValue,
    getFieldValue,
  } = useContext(Context);
  const value = getFieldValue(name);

  /**
   * TODO 调用 setFieldsValue 会刷新整张表单
   * @param val 
   */
  const onChange = (val: any) => {
    if (Array.isArray(val) && val.length){
      setFieldsValue({
        [name]: val[0]
      })
    } else {
      setFieldsValue({
        [name]: val
      })
    }
  }

  getFieldDecorator(name, {
    initialValue: initialValue && (initialValue !== true) ? initialValue : 
      initialValue == true && options.length ? options[0].value : undefined,
    rules: [
      required ? { 
        required: true,
        message: `请选择${label}`,
      } : undefined, 
      ...(rules || [])
    ],
  });

  return (
    <FormItem
      name={name}
      required={required}
      label={label}
      labelAddon={labelAddon}
    >
      <Picker
        {...rest}
        data={options} 
        cols={1}
        onChange={onChange}
        value={value ? [value] : [initialValue]}
      >
        <List.Item arrow="horizontal" />
      </Picker>
    </FormItem>
  )
}