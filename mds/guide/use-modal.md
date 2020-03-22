---
group:
  title: guide
---

# useModal

处理弹窗。

## features

* 支持内置表单。

## demos

### demo 1: modal basic

```jsx
import React from 'react';
import { useModal } from 'chaos-hooks';
import { Button, Modal } from 'antd';

export default () => {
  const { visible, show, hide, dataSource } = useModal();

  const handleClick = () => {
    show({
      title: 'test title'
    })
  }

  return (
    <div>
      <Button type="primary" onClick={handleClick}>打开弹窗</Button>
      <Modal 
        title={dataSource ? dataSource.title : undefined} 
        visible={visible} 
        onCancel={() => hide()}
      >
        我是一个弹窗
      </Modal>
    </div>
  )
}
```

### demo 2: modal with form

```jsx
import React from 'react';
import { useModal } from 'chaos-hooks';
import { Button, Modal, Form, Input } from 'antd';

export default () => {
  const { visible, show, hide, dataSource, form } = useModal({
    enableForm: true,
    getValuesFromDataSource: (vals) => {
      return vals ? {
        name: vals.name
      } : undefined;
    }
  });
  const { getFieldDecorator, validateFields, getFieldError } = form;

  const handleClick = () => {
    show({
      name: 'test'
    })
  }

  const handleSubmit = () => {
    validateFields().then((vals) => {
      console.log(vals);
    }).catch(() => { });
  }

  const errs = getFieldError('name');

  return (
    <div>
      <Button type="primary" onClick={handleClick}>打开弹窗</Button>
      <Modal 
        title="我是一个弹窗" 
        visible={visible} 
        onCancel={() => hide()}
        onOk={handleSubmit}
      >
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
        </Form>
      </Modal>
    </div>
  )
}
```

## properties

useModal 参数。

| 属性 | 类型 | 默认值 | 意义 |
| :- | :-: | :-: | -: |
| options.enableForm | boolean | false | 是否携带表单 |
| options.getValuesFromDataSource | (vals: any) => any | undefiend | 从 dataSource 获取注入表单的值 |
| options.formOptions | useForm.Options | undefined | useForm 参数 |

