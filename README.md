# topic-hiido


## ⚡快速开始
+ ### 脚本接入
```html
<script type="text/javascript" src='https://unpkg.com/topic-hiido'></script>
```

```javascript
// 设置公共配置并初始化（ES5）
if(window.TopicHiddoEvent) {
  topicHdEvent = new window.TopicHiddoEvent({
    prodid: 'xxx', // 业务组
    eventid: 123, // 事件 ID
    beforeReport: function(hdevent) {
      // hdevent.xxxxx
      hdevent.setOverseaMode()
      hdevent.setDebugMode(true)
    }
  })

  topicHdEvent.init()

  window.hdReport = function (option) {
    console.log('report-option', option)
    topicHdEvent.report(option)
  }
}

```

+ ### NPM 接入

```bash
npm i topic-hiido
```

```javascript
// 设置公共配置并初始化
const topicHdEvent = new TopicHiddoEvent({
  prodid: 'xxx', // 业务组
  eventid: 123, // 事件 ID
  beforeReport: function(hdevent) {
    // hdevent.xxxxx
    hdevent.setOverseaMode()
    hdevent.setDebugMode(true)
  }
})

topicHdEvent.init()

export const hdReport = (option) => {
  console.log("report-option", option)
  topicHdEvent.report(option)
}
```



## 💡API

### ```new TopicHiddoEvent(config)```
接受公共配置config，返回topicHdEvent实例

#### ```config```

| 属性 | 说明 | 类型 |
| - | - | - |
| sdkUrl | hiddo Sdk地址  | string， 默认为 ```//cdn.hiido.com/sdk/websdk.js``` |
| prodid | 业务组/产品ID | string |
| eventid | 事件ID | number |
| hdOptions | 其他选项 | object, 具体参考文档 [➡️](https://developer.duowan.com/doc/hiidosdk/websdk/README.html) |
| beforeReport | 上报前的公共配置 | (hdevent) => void, 具体参考文档 [➡️](https://developer.duowan.com/doc/hiidosdk/websdk/README.html) |

### ```topicHdEvent.init()```
初始化上报，将配置和初始化分离，支持延迟初始化（先上报再初始化）

### ```topicHdEvent.report(option)```
接受定制的option选项并上报

#### ```option```

| 属性 | 说明 | 类型 |
| - | - | - |
| prodid | 业务组/产品ID，设置后会覆盖```config.prodid``` | string |
| eventid | 事件ID，```config.eventid``` | number |
| hdOptions | 其他选项，设置后会覆盖```config.hdOptions```（**不是合并**） | object, 具体参考文档 [➡️](https://developer.duowan.com/doc/hiidosdk/websdk/README.html) |
| beforeReport | 定制的上报前的公共配置 | (hdevent) => void, 具体参考文档 [➡️](https://developer.duowan.com/doc/hiidosdk/websdk/README.html) |

