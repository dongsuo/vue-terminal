# VUE-TERMINAL
Vue-terminal is a dependency-free, lightweight terminal emulator in Vue.js. Vue-terminal provide flexible api for developer to define task or command that can be executed by users.
## [Try the demo](https://islasher.com/vue-terminal)

### How to use?
```bash
npm install vue-terminal

# you can also load vue-terminal.min.js in script tag:
# <script src="/path/to/file/vue-terminal.min.js"></script>
```

### Example

```javascript
<template>
	<vue-terminal :task-list="taskList" :command-list="commandList" />
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
### About commandList and taskList

The content of taskList or commandList is defined as json object, the key of the json is command name or task name, here is the structure of command or task:

```javascript
{
  commandOrTaskName:{
    description: '',
    messagesOrTask: [] //(function)
  }
}
```

`commandOrTaskName` is the command name you defined.

`description` is something to describe your task, which will be used by the `help` command.

`messagesOrTask` is the main part defined to response the command, in `commandList`, the key is `messages`, and in `taskList` the key should be same with task name, here is the detail:
- messages _(array)_

  messages is an array of `Message`, you can only show message string in terminal instance as a response to a command.

- task _(function)_

  you can do more with task, task is a function which use taskName as function name, the first argument is `pushToList`, which is a function allow you to send message to the terminal instance, you can call `pushToList(Message)` to render message in the terminal, the second argument is the string user input, your can parse it and do something interesting. You must return a resolved Promise to tell terminal instance that the task has ended, so that the terminal instance can get ready for more command.

- Message

  Message is an object, used to define message showed in terminal:
  ```javascript
  {
    time: '', // time to show time before message body
    label: '', // label to show a label before message body
    type: '', // type to set message's type, will set a class to message's label part, there is 5 builtin types: error, success, info, warning, system
    message: '' // message is a string, the main text showed in terminal.
  }
  ```
  here is an example:
  ```javascript
    { time: generateTime(), type: 'system', label: 'System', message: 'Welcome to vTerminal, this is an example to show you what this project can do.' },
  ```

You can check `/docs/plugins/commandList.js` and  `/docs/plugins/taskList.js` to view the detail of task and command config.

### Configuration options

The following options can be passed as props to the `VueTerminal` component to customize its behavior:

-**title** _(string)_: Sets the title that appears at the top of the terminal window and in front of the prompt. Defaults to `vTerminal`.

- **showHeader** _(boolean)_: Indicates whether or not to render the window on top of the terminal. Defaults to `true`.

- **greeting** _(string)_: Sets the greeting that will be shown to the user in the first line of the terminal. Pass `false` to not render a greeting. No defaults value.

- **defaultTask** _(string)_: The default task runned when initializing the terminal, the task must be defined in `taskList` or `commandList`.

- **defaultTaskCommandd** _(string)_: the initial command showed when initializing the terminal, default to `init vTerminal`.

- **prompt** _(string)_: The text to show before the prompt. Defaults to `\{{title}}`.

- **showHelpMessage** _(boolean)_: Indicates whether a help message should be shown.  Defaults to `true`.

- **unknownCommandMessage** _(object)_: Allows the message that is printed when an unknown command is run to be customized. This object should have a `message` property and can optionally include some additional properties that change how this message is displayed:
  ```javascript
  { time: '10:53', type: 'error', label: 'Error', message: 'That command is not recognized!' },
  ```

  If not provided, the default message will be displayed:

  ```
  Unknown Command.

  type "help" to get a supporting command list.
  ```
- **autoFocus** _(boolean)_: Auto focus cursor when initializing the terminal. Defaults to `true`.

If you want more feature or have problem while using this package, feel free to pull a request or open an issue.
