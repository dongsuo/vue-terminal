# vue-terminal-emulator

> A terminal emulator in Vue

### message 对象
message 对象对应于命令行中的单条message，其基本结构如下：
    { 
      time: generateTime(), 
      type: 'warning',
      label: 'warning',
      message: 'This is a Waning Message!' 
    }
    
message对象的配置目前支持如上四个字段，其基本含义如下：
- time字段可省略，建议使用提供的 generateTime 方法，也可自己配置；
- type可省略，目前支持5个值：info,warning,success,error,system,分别对应5种颜色，用于label字段的高亮；
- label字段可省略，可随意赋值，但是不建议太长，影响美观；
- message为必须字段就是纯文本内容；

### 核心配置文件
命令行的主要配置文件是 plugins/commadnList.js 和 plugins/taskList.js 这两个文件，这两个文件的基本结构是一致的，都 export一个对象，对象key是任务或者命令名称，值是由 description 和 messages(task) 组成的对象，基本的结构如下所示：

    {
      commandOrTask:{
        description:'',
        messagesOrTask:[]//(function)
        }
    }

VueTerminalEmulator 组件会import这两个文件，根据其中的配置生成帮助项并执行相应的指令，其中description即为'help'指令中各个命令的帮助信息。

```
  // VueTerminalEmulator 中引入配置文件
  import commandList from './../plugins/commandList'
  import taskList from './../plugins/taskList'
```

其中，commandList 中存放静态的指令，指令执行之后，直接列出所有 message，然后指令结束，无需等待。而taskList 中是异步的任务，指令执行后组件会进入loading状态，任务完成后，通过resolve一个消息来通知VueTerminalEmulator 组件任务结束，解除loading状态（关键词：异步、promise、resolve）。以下是这两种命令的例子：
异步任务：

![](https://user-gold-cdn.xitu.io/2017/11/10/2c49e1275ba4ad1b58528d6968680eee)

help是典型的静态指令：

![](https://user-gold-cdn.xitu.io/2017/11/10/631ebcdca9860e265e21baf7d83c3065)

#### 静态指令
commandList 中的核心是messages数组，数组内是多个message对象，执行command时，会将command中的message显示在Terminal窗口中，比较简单，不多说，一个示例就解决了：

    contact: {
        description: 'How to contact author',
        messages: [
        { message: 'Website: http://xiaofeixu.cn' },
        { message: 'Email: xuxiaofei915@gmail.com' },
        { message: 'Github: https://github.com/dongsuo' },
        { message: 'WeChat Offical Account: dongsuo' }
        ] }
就是这么简单，不需要更多的语言。
#### 异步任务
taskList 的核心是名称与任务名一致的函数，该函数接受两个参数：一个函数(pushToList)和命令行(input)的输入值。你可以根据input值来执行具体的任务，然后将message作为参数调用pushToList().当任务结束时，需要返回一个promise，promise要resolve一个message对象通知组件任务结束，如有需要，也可以reject一个message对象通知组件任务出错，示例代码：

    echo: {
        description: 'Echoes input, Usage:  echo <your input>',
        //echo将用户的输入原封不动地返回，显示在terminal窗口中
        echo(pushToList, input) {
          //解析用户输入
          input = input.split(' ')
          input.splice(0, 1)
          const p = new Promise(resolve => {
          // 将message对象作为参数调用pushToList()
            pushToList({ time: generateTime(), label: 'Echo', type: 'success', message: input.join(' ') });
            // 通过resolve一个message对象通知组件任务结束
            resolve({ type: 'success', label: '', message: '' })
          })
          // 返回 promise 对象
          return p
        }
      }

### 部署
当你已经确认简历做好、没有bug之后，就可以部署了，首先执行`npm run build`命令，然后把你的代码push到Github上，点击settings, 找到Github Pages，将source设置为docs folder，点击save就部署成功了。
