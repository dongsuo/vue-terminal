# VUE-TERMINAL
Vue-terminal is a dependency-free, lightweight terminal emulator in Vue.js. Vue-terminal provide flexible api for developer to define task or command that can be executed by users.
## [Try the demo](https://islasher.com/vue-terminal)

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

### Configuration options

The following options can be passed as props to the `VueTerminal` component to customize its behavior:

**title** _(string)_: Sets the title that appears at the top of the terminal window, in the greeting, and in front of the prompt. Defaults to `vTerminal`.

**showHeader** _(boolean)_: Indicates whether or not to render the window chrome on top of the terminal. Defaults to `true`.

**greeting** _(string)_: Sets the greeting that will be shown to the user in the first line of the terminal. Pass `false` to not render a greeting. Defaults to `Welcome to vTerminal.`.

**showInitialCd** _(boolean)_: Initializes the terminal by showing an initial `cd vTerminal` command. Defaults to `true`.

**prompt** _(string)_: The text to show before the prompt. Defaults to `\vTerminal`.

**showHelpMessage** _(boolean)_: Indicates whether a help message should be shown.  Defaults to `true`.

**unknownCommandMessage** _(object)_: Allows the message that is printed when an unknown command is run to be customized. This object should have a `message` property and can optionally include some additional properties that change how this message is displayed:

```js
{ time: '10:53', type: 'error', label: 'Error', message: 'That command is not recognized!' },
```

If not provided, the default message will be displayed:

```
Unknown Command.

type "help" to get a supporting command list.
```
