---
group:
  title: guide
---

# useFetch

处理远程请求的轻便 hooks。

## features

* 支持手动触发。

## demos

### demo 1: fetch basic

```jsx
import React from 'react';
import { useFetch } from 'chaos-hooks';
import axios from 'axios';
import { Table } from 'antd';

export default () => {
  const { loading, data = [], fetch } = useFetch(() => {
    return axios.get('/getList.json').then(res => {
      if (res && res.success){
        return res.data;
      } else {
        return [];
      }
    })
  });
  const columns = [{
    title: '姓名',
    key: 'name',
    dataIndex: 'name',
  }, {
    title: '身份证号',
    key: 'idCard',
    dataIndex: 'idCard',
  }, {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
  }];

  return <Table columns={columns} dataSource={data} loading={loading} />
}
```

### demo 2: fetch manual

```jsx
import React from 'react';
import { useFetch } from 'chaos-hooks';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

export default () => {
  const form = Form.useForm();
  const { loading, data, fetch: submit } = useFetch((data) => {
    return axios.post('/submit', data)
  }, {
    manual: true
  });

  const handleSubmit = () => {
    form[0].validateFields().then((vals) => {
      submit(vals);
    }).catch(() => { });
  }

  return (
    <Form form={form[0]} layout="vertical">
      <Form.Item label="姓名" name="name" required rules={[{
        required: true, message: '姓名不能为空'
      }]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>

      <Button type="primary" loading={loading} onClick={handleSubmit}>提交</Button>
    </Form>
  );
}
```

## usage

```jsx | pure
import { useFetch } from 'chaos-hooks';

const { loading, data, fetch: submit } = useFetch((data) => {
  // handle request, return promise
}, {
  // manual: true,// 是否手动触发，默认为否
})
```

## properties

useFetch 参数。

| 属性 | 类型 | 默认值 | 意义 |
| :- | :-: | -: | -: |
| request | (params: any) => Promise | undefined | 请求方法 |
| options.manual | boolean | false | 是否手动触发 |