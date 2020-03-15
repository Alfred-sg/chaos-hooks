import React, { useContext } from 'react';
import { InputItem } from 'antd-mobile';
import FormItem from './FormItem';
import Context from './Context';
import VerifyCode from '../VerifyCode';
import styles from './index.less';

export default ({
  name,
  code = '',
  onRefresh,
  ...rest
}: {
  name: string,
  code: string,
  onRefresh: () => void,
  [key: string]: any,
}) => {
  const {
    getFieldDecorator,
    getFieldError,
  } = useContext(Context);

  const rules = [{
    required: true,
    message: `请输入验证码`,
    whitespace: true, 
  }].filter(item => !!item);

  return (
    <FormItem
      name={name}
      required={true}
      label="验证码"
      className={styles.code_verifier__item}
    >
      <VerifyCode code={code} onRefresh={onRefresh} />
      
      {getFieldDecorator(name, {
        rules,
      })(
        <InputItem
          placeholder="请输入验证码"
          maxLength={4}
          {...rest}
          error={!!getFieldError(name).length}
        />
      )}
    </FormItem>
  )
}