# VUE-TERMINAL
Vue-terminal is a dependency-free, lightweight terminal emulator in Vue.js. Vue-terminal provide flexible api for developer to define task or command that can be executed by users.
## [Try the demo](https://xiaofeixu.cn/vue-terminal)

### How to use?
```bash
npm install vue-terminal
```
### Example

```vue
// you can also load vue-terminal.min.js in script tag:
// <script src="/path/to/file/vue-terminal.min.js"></script>
<template>
	<vue-terminal :task-list="taskList" :command-list="commandList" style="width:50%;margin:0 auto"></vue-terminal>
</template>

<script>
  import VueTerminal from 'vue-terminal';
  export default {
    components: { VueTerminal },
    data () {
      return {
        taskList: {
            // your tasks
        },
        commandList: {
            // your commands
        }
      }
    }
  }
</script>
```
The content of taskList or commandList is:
```vue
    {
      commandOrTask:{
        description:'',
        messagesOrTask:[]//(function)
        }
    }
```
You can check /docs/plugins/commandList.js and  /docs/plugins/taskList.js to view the detail of task and command.
