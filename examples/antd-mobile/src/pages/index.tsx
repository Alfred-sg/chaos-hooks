import React from 'react';
import { Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { Form, Input, Select } from '../../components/Form';
import { useForm } from '../../chaos-hooks';
import styles from './index.less';

export default () => {
  const form = useForm();
  const { getFieldValue, getFieldsValue } = form;
  const onClick = () => {
    form.validateFields().then(vals => {
      console.log(vals)
    }).then(errs => {
      console.log(errs)
    })
  }

  console.log(getFieldsValue());

  return (
    <div>
      <Form form={form}>
        <Input name='name' label="姓名" />
        <Select name='sex' label="性别" 
          options={[{label: '男', value: 'male'}, {label: '女', value: 'female'}]} 
        />

        {getFieldValue('sex') == 'male' && <Input name='destory' label="测试销毁" />}
      </Form>

      <WhiteSpace size="lg" />

      <WingBlank size="lg">
        <Button type="primary" onClick={onClick}>提交</Button>
      </WingBlank>
    </div>
  );
}
