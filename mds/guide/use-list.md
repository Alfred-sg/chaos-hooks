---
group:
  title: guide
---

# useList

处理列表的轻便 hooks。

## features

* 支持增加、删除。
* 支持交换位置。
* 支持移动。

## demos

### demo 1: add & remove

```jsx
import React from 'react';
import { useList } from 'chaos-hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, add, remove } = useList({
    defaultList: ['item 1', 'item 2', 'item 3']
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button 
          onClick={() => add(`item ${list.length + 1}`)} 
          style={{marginRight: '5px'}}
        >
          添加
        </Button>
        <Button
          onClick={() => remove(0)} 
        >
          删除首项
        </Button>
      </div>
      {list.map(item => {
        return <Tag key={item}>{item}</Tag>
      })}
    </div>
  )
}
```

### demo 2: exchange

```jsx
import React from 'react';
import { useList } from 'chaos-hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, exchange } = useList({
    defaultList: ['item 1', 'item 2', 'item 3']
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button
          onClick={() => exchange(0, 2)} 
        >
          首项和尾项换位
        </Button>
      </div>
      {list.map(item => {
        return <Tag key={item}>{item}</Tag>
      })}
    </div>
  )
}
```

### demo 3: move

```jsx
import React from 'react';
import { useList } from 'chaos-hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, move } = useList({
    defaultList: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5']
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button
          onClick={() => move(0, 3)} 
          style={{marginRight: '5px'}}
        >
          首项下移至倒数第二项
        </Button>
        <Button
          onClick={() => move(4, 1)} 
        >
          尾项上移至第二项
        </Button>
      </div>
      {list.map(item => {
        return <Tag key={item}>{item}</Tag>
      })}
    </div>
  )
}
```

### demo 4: setList

```jsx
import React from 'react';
import { useList } from 'chaos-hooks';
import { Button, Tag } from 'antd';

export default () => {
  const { list, setList } = useList({
    onChange: (newList) => alert(JSON.stringify(newList)),
    defaultList: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5']
  });

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button
          onClick={() => setList(['hahaha'])} 
        >
          全量修改
        </Button>
      </div>
      {list.map(item => {
        return <Tag key={item}>{item}</Tag>
      })}
    </div>
  )
}
```

## properties

useFetch 参数。

| 属性 | 类型 | 默认值 | 意义 |
| :- | :-: | -: | -: |
| defaultList | any[] | [] | 默认列表 |
| onChange | (list: any[]) => void | undefined | 列表变更时回调 |

## apis

| 方法 | 类型 | 意义 |
| :- | :-: | -: |
| list | any[] | 列表数据 |
| add | (item: any) => void | 添加一项 |
| remove | (item: any | number) => void | 移除一项 |
| exchange | (sourceIndex: number, targetIndex: number) => void | 交换 |
| move | (sourceIndex: number, targetIndex: number) => void | 移动 |
| setList | (newList: any[]) => void | 全量修改 |