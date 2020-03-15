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
        <Picker 
          data={options} 
          extra={`请选择${label}`} 
          format={labels => labels.filter(item => !!item).join(',')}
          {...rest}
        >
          <List.Item arrow="horizontal" />
        </Picker>,
      )}
    </FormItem>
  )
}