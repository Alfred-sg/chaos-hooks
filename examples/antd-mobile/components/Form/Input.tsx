import React, { useContext } from 'react';
import { InputItem } from 'antd-mobile';
import FormItem from './FormItem';
import Context from './Context';

const IdentityCodeValidator = () => {}

// 国内手机号校验
const ChinaPhoneValidator = (rule: any, value: string, cb: Function) => {
  if (
    value.split('')
      .filter(item => item !== ' ')
      .join('')
      .match(/^1\d{10}$/)
  ) {
    cb();
  } else {
    cb('请输入合法的手机号码');
  }
};

const getInnerRules = ({
  type,
  required,
  label,
}: {
  type?: string,
  required?: boolean,
  label: string,
}) => {
  const rules = [];

  if (required){
    rules.push({
      required: true,
      message: `请输入${label}`,
      whitespace: true, 
    });
  }

  switch(type){
    case 'chinaPhone':
      rules.push({
        validator: ChinaPhoneValidator,
      });
      break;
    case 'idCard':
      rules.push({
        validator: IdentityCodeValidator,
      })
  }

  return rules;
}

const getExtraProps = (type?: string) => {
  const extraProps: { [key: string]: any } = {};

  switch(type){
    case 'chinaPhone':
      extraProps.type = 'phone';
      break;
    case 'idCard':
      extraProps.maxLength = 18;
      break;
  }
  
  return extraProps;
}

export default ({
  when,
  name,
  type,
  label,
  labelAddon,
  required = true,
  initialValue,
  rules,
  ...rest
}: {
  when?: (vals: { [key: string]: any }) => boolean,
  name: string,
  type?: 'chinaPhone' | 'idCard',
  label: string,
  labelAddon?: React.ReactNode,
  required?: boolean,
  initialValue?: any;
  rules?: any,
  [key: string]: any,
}) => {
  const {
    getFieldDecorator,
    getFieldError,
    getFieldsValue,
  } = useContext(Context);

  // 条件显示
  if ( when ){
    const vals = getFieldsValue();
    if ( !when(vals) ) return null;
  }

  const innerRules = getInnerRules({
    type,
    required,
    label,
  });
  const finalRules = [
    ...innerRules, 
    ...(rules || [])
  ].filter(item => !!item);
  const extraProps = getExtraProps(type);

  return (
    <FormItem
      name={name}
      required={required}
      label={label}
      labelAddon={labelAddon}
    >
      {getFieldDecorator(name, {
        initialValue,
        rules: finalRules,
      })(
        <InputItem
          placeholder={`请输入${label}`}
          maxLength={30}
          {...rest}
          {...extraProps}
          error={!!getFieldError(name).length}
        />,
      )}
    </FormItem>
  )
}