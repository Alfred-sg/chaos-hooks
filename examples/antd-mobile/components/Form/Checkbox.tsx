import React, { useContext } from 'react';
import { Checkbox } from 'antd-mobile';
import FormItem from './FormItem';
import Context from './Context';

type Option = {
  label: string, 
  value: string
}

export default ({
  name,
  options,
  label,
  labelAddon,
  required = true,
  initialValue,
  rules,
  itemProps,
  ...rest
}: {
  name: string,
  options: Option[],
  label: string,
  labelAddon?: React.ReactNode,
  required?: boolean,
  initialValue?: any;
  rules?: any,
  itemProps?: any,
  [key: string]: any,
}) => {
  const {
    getFieldDecorator,
    setFieldsValue,
    getFieldValue,
  } = useContext(Context);

  const onChange = (val: string) => {
    const checked: string[] = getFieldValue(name) || [];

    if (checked.includes(val)) {
      setFieldsValue({
        [name]: checked.filter(item => item !== val),
      });
    } else {
      setFieldsValue({
        [name]: [...checked, val],
      });
    }
  };

  getFieldDecorator(name, {
    initialValue: initialValue ? initialValue : undefined,
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
      {options.map(item => {
        return (
          <Checkbox.CheckboxItem
            key={item.value}
            value={item.value}
            {...(typeof itemProps == 'function' ? itemProps(item) : itemProps)}
            onChange={() => onChange(item.value)}
          >
            {item.label}
          </Checkbox.CheckboxItem>
        );
      })}
    </FormItem>
  )
}