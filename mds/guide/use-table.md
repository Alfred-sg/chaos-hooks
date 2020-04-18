---
group:
  title: guide
---

# useTable

处理表格。

## features

* 支持远程加载数据。
* 支持结合 antd Table 组件作字段排序、过滤。
* 支持前端伪分页（伪分页情形下不支持字段排序和过滤）。
* 支持带搜索框。
* 支持列选择。

## demos

### demo 1: table basic

```jsx
import React from 'react';
import { useFetch, useTable } from 'chaos-hooks';
import axios from 'axios';
import { Table } from 'antd';

export default () => {
  const { props } = useTable(() => {
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

  return <Table columns={columns} {...props} />
}
```

### demo 2s: sorterable & filterable

```jsx
import React, { useState } from 'react';
import { useTable } from 'chaos-hooks';
import axios from 'axios';
import { Table } from 'antd';

export default () => {
  const [name, setName] = useState('');
  const { props, search } = useTable((params) => {
     return axios.get('/getList.json', { params }).then(res => {
      if (res && res.success){
        return res.data;
      } else {
        return [];
      }
    })
  });

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    sorter: true
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    filters: [
      { text: 'name_1', value: 'name_1' },
      { text: 'name_2', value: 'name_2' },
    ],
  }];

  return (
    <Table 
      columns={columns} 
      {...props} 
      rowKey="id"
    />
  )
}
```

### demo 3: fake pagination

```jsx
import React from 'react';
import { useTable } from 'chaos-hooks';
import { Table } from 'antd';

export default () => {
  const { props } = useTable(() => {
    const list = [];

    for (let i = 0; i< 60; i++){
      list[i] = {
        id: i,
        name: `name_${i}`
      }
    };

    return Promise.resolve({
      success: true,
      data: list
    })
  }, {
    enableFakePagination: true,
  });

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }];

  return (
    <Table 
      columns={columns} 
      {...props} 
      pagination={{ ...props.pagination, showSizeChanger: true, showQuickJumper: true }} 
      rowKey="id"
    />
  )
}
```

### demo 4: search filter

```jsx
import React, { useState } from 'react';
import { useTable } from 'chaos-hooks';
import { Table, Input, Button } from 'antd';

export default () => {
  const [name, setName] = useState('');
  const { props, search } = useTable((params) => {
    const { name } = params || {};
    const list = [];

    for (let i = 0; i< 60; i++){
      list[i] = {
        id: i,
        name: `name_${i}`
      }
    };

    return Promise.resolve({
      success: true,
      data: name ? list.filter(item => item.name === name) : list,
    })
  }, {
    enableFakePagination: true,
  });

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  }];

  return (
    <div>
      <div style={{marginBottom: '10px'}}>
        <Input 
          placeholder="请输入名称搜索" 
          style={{marginRight: '10px', width: '40%'}} 
          onChange={(event) => {
            setName(event.target.value);
          }} 
        />
        <Button type="primary" onClick={() => {
          search({
            name
          });
        }}>搜索</Button>
      </div>
      <Table 
        columns={columns} 
        {...props} 
        pagination={{ ...props.pagination, showSizeChanger: true, showQuickJumper: true }} 
        rowKey="id"
      />
    </div>
  )
}
```

### demo 5: row selection

```jsx
import React from 'react';
import { useTable } from 'chaos-hooks';
import { Table, Button } from 'antd';

export default () => {
  const { props, getSelectedRowKeys } = useTable(() => {
    const list = [];

    for (let i = 0; i< 60; i++){
      list[i] = {
        id: i,
        name: `name_${i}`
      }
    };

    return Promise.resolve({
      success: true,
      data: list
    })
  }, {
    enableFakePagination: true,
    enableRowSelection: true,
  });

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  }];

  const alertSelectedRowKeys = () => {
    alert(JSON.stringify(getSelectedRowKeys()))
  }

  return (
    <div>
      <Button 
        type="primary" 
        onClick={alertSelectedRowKeys} 
        style={{marginBottom: '10px'}}
      >
        选中项
      </Button>

      <Table 
        columns={columns} 
        {...props} 
        rowKey="id"
      />
    </div>
  )
}
```

## properties

useTable 参数。

| 属性 | 类型 | 默认值 | 意义 |
| :- | :-: | -: | -: |
| request | (params: any) => Promise | undefined | 请求方法 |
| options.defaultParams | any | undefined | 默认参数 |
| options.useFetchOptions | object | undefined | useFetch 配置项 |
| options.enableRowSelection | boolean | false | 开启选择 |
| options.enableFakePagination | boolean | false | 伪分页 |
| options.enableSuccessLog | boolean | false | 打印成功日志 |
| options.enableFailLog | boolean | true | 打印失败日志 |
| options.transfrom | (data: any, pagination) => { pagination, list } | undefined | 转换响应 |
| options.transfromParams | (params) => any | undefined | 转换请求 |

## apis

| 方法 | 类型 | 意义 |
| :- | :-: | -: |
| params | object | 请求参数 |
| searchFields | object | 查询表单参数 |
| search | (...args: any[]) => Promise | 基于原有的分页数据进行查询，查询数据会被重置 |
| research | (...args: any[]) => Promise | 基于原有的查询数据进行查询，查询数据不会被重置 |
| reset | () => void | 重置，基于默认查询数据进行查询 |
| getSelectedRowKeys | () => string[] | 获取选中列的 key 键列表 |
| clearSelectedRowKeys | () => void | 重置选中项 |
| props | object | 注入 Table 组件的 props |
| props.dataSource | object[] | 数据列表 |
| props.pagination | object | 分页信息 |
| props.loading | boolean | 数据是否加载中 |
| props.onChange | (pagination, filters, sorter) => void | Table 组件的 onChange 绑定事件 |
| props.rowSelection | string[] | 选中列的 key 键列表 |
