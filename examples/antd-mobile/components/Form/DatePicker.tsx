import React, { useContext } from 'react';
import { List, DatePicker } from 'antd-mobile';
import FormItem from './FormItem';
import Context from './Context';

export default ({
  name,
  label,
  labelAddon,
  required = true,
  initialValue,
  rules,
  ...rest
}: {
  name: string,
  label: string,
  labelAddon?: React.ReactNode,
  required?: boolean,
  initialValue?: any;
  rules?: any,
  [key: string]: any,
}) => {
  const {
    getFieldDecorator,
  } = useContext(Context);

  return (
    <FormItem
      name={name}
      required={required}
      label={label}
      labelAddon={labelAddon}
    >
      {getFieldDecorator(name, {
        initialValue: initialValue ? initialValue : undefined,
        rules: [
          required ? { 
            required: true,
            message: `请选择${label}`,
          } : undefined, 
          ...(rules || [])
        ],
      })(
        <DatePicker extra={`请选择${label}`} {...rest} >
          <List.Item arrow="horizontal" />
        </DatePicker>
      )}
    </FormItem>
  )
}