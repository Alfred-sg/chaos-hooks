---
group:
  title: guide
---

# useForm

仿 antd3 处理表单的 hooks，可用于对接 antd-mobile。性能方面逊色于 antd4 的增量重绘。字段变更时，chaos-hooks 会驱动表单的重绘流程，同时销毁字段时会有两次重绘。不支持滚动到校验失败节点。

## features

* 支持 namepath 形式注册、更新字段。
* 提供 validateFields 方法校验字段。
* 提供 getFieldDecorator 方法注册字段。
* 提供 registerField、unRegisterField 方法注册字段。
* 提供 isFormChanged 方法判断表单是否变更。
* [TODO] 支持校验中状态。
* [TODO] 性能优化。

## demos

### demo 1: getFieldDecorator

```jsx
import React from 'react';
import { useForm } from 'chaos-hooks';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

export default () => {
  const form = useForm();
  const { getFieldDecorator, validateFields, getFieldError } = form;

  const handleSubmit = () => {
    validateFields().then((vals) => {
      console.log(vals);
    }).catch(() => { });
  }

  const errs = getFieldError('name');

  return (
    <Form layout="vertical">
      <Form.Item 
        label="姓名" 
        help={errs ? errs.join(',') : undefined}
        validateStatus={errs ? 'error' : undefined}
      >
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: '姓名不能为空'
          }],
          getValueFromEvent: (event) => {
            return event.target.value;
          }
        })(
          <Input placeholder="请输入姓名" />
        )}
      </Form.Item>

      <Button type="primary" onClick={handleSubmit}>提交</Button>
    </Form>
  );
}
```

### demo 2: registerField

```jsx
import React, { useEffect } from 'react';
import { useForm } from 'chaos-hooks';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

const CustomInput = ({
  name,
  rules,
  defaultValue,
  form,
  ...rest
}) => {
  useEffect(() => {
    return form.registerField(name, {
      initialValue: defaultValue,
      rules,
    })
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    form.setFieldValue(name, value);
    form.validateField(name, value);
  }

  return <Input onChange={handleChange} {...rest} />;
}

export default () => {
  const form = useForm();
  const { getFieldDecorator, validateFields, getFieldError } = form;

  const handleSubmit = () => {
    validateFields().then((vals) => {
      console.log(vals);
    }).catch(() => { });
  }

  const errs = getFieldError('name');

  return (
    <Form layout="vertical">
      <Form.Item 
        label="姓名" 
        help={errs ? errs.join(',') : undefined}
        validateStatus={errs ? 'error' : undefined}
      >
        <CustomInput 
          form={form} 
          name="name" 
          rules={[{
            required: true, message: '姓名不能为空'
          }]} 
          placeholder="请输入姓名"
        />
      </Form.Item>

      <Button type="primary" onClick={handleSubmit}>提交</Button>
    </Form>
  );
}
```

## usage

```jsx | pure
import { useForm } from 'chaos-hooks';

const form = useForm();
const { validateFields } = form;
```

## properties

useForm 参数。

| 属性 | 类型 | 默认值 |
| :- | :-: | -: |
| onValuesChange | (values: any) => void | undefined |

## apis

| 方法 | 类型 | 意义 |
| :- | :-: | -: |
| registerField | (name: string, meta?: FieldMeta) => void | 注册字段，返回 unRegisterField |
| unRegisterField | (name: string) => void | 销毁字段 |
| setFieldMeta | (name: string, key: string \| any, value?: any) => void | 设置字段的元数据 |
| getFieldMeta | (name: string, key?: string) => any | 获取字段的元数据 |
| getFieldDecorator |  (name: string, meta: FieldMeta) => (inst: React.ReactElement) => React.ReactElement; | 字段组件的装饰器 |
| getFieldRef | (name: string) => any | 获取字段的 ref 引用，配合 getFieldDecorator 使用有效 |
| getFieldsValue | () => Fields | 获取字段的值 |
| getFieldValue | (name: string) => any | 获取字段的值 |
| getFieldInitialValue | (name: string) => any | 获取字段的初始值 |
| getFieldsError | () => Errors | 获取校验文案 |
| getFieldError |  (name: string) => undefined | string[] | 获取校验文案 |
| setFieldValue | (name: string, value: any) => void | 设置字段的值 |
| setFieldsValue | (vals: Fields) => void | 设置字段的值 |
| resetFields | () => void | 置回初始值 |
| validateField | (name: string, value?: any) => Promise<Fields\> | 校验字段 |
| validateFields | (names?: string[]) => Promise<Fields\> | 校验字段 |
| isFormChanged | () => boolean | 判断表单是否变更 |
| isFieldTouched | (name: string) => boolean | 是否设置过字段的值 |
| isFieldsTouched | () => boolean | 是否设置过字段的值 |