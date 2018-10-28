<template>
  <div class="terminal"  @click="handleFocus">
    <div style="position:relative">

      <div class="header">
        <h4>{{title}}</h4>
        <ul class="shell-dots">
          <li class="red"></li>
          <li class="yellow"></li>
          <li class="green"></li>
        </ul>
      </div>

      <div style="position:absolute;top:0;left:0;right:0;overflow:auto;z-index:1;margin-top:30px;max-height:500px" ref="terminalWindow">
        <div class="terminal-window" id="terminalWindow" >
          <p>Welcome to {{title}}.</p>
          <p>
            <span class="prompt"></span><span class="cmd">cd {{title}}</span>
          </p>

          <p v-for="(item, index) in messageList" :key="index">
            <span>{{item.time}}</span>
            <span v-if="item.label" :class="item.type">{{item.label}}</span>
            <span class="cmd" v-if="!item.message.list">{{item.message}}</span>
            <span class="cmd" v-else>
              <span>{{item.message.text}}</span>
              <ul>
                <li v-for="(li,index) in item.message.list" :key="index">
                  <span v-if="li.label" :class="li.type">{{li.label}}:</span>
                  <pre>{{li.message}}</pre>
                </li>
              </ul>
            </span>
          </p>

          <p v-if="actionResult"> <span class="cmd">{{actionResult}}</span></p>

          <p class="terminal-last-line" ref="terminalLastLine">
            <span class="prompt" v-if="lastLineContent==='&nbsp'"> \{{title}} </span>
            <span>{{inputCommand}}</span>
            <span :class="lastLineClass" v-html="lastLineContent"></span>
            <input
              v-model="inputCommand"
              :disabled="lastLineContent!=='&nbsp'"
              autofocus="true"
              type="text"
              @keyup="handleCommand($event)"
              ref="inputBox"
              class="input-box">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'VueTerminal',
    data() {
      return {
        title: 'vTerminal',
        messageList: [],
        actionResult: '',
        lastLineContent: '...',
        inputCommand: '',
        supportingCommandList: '',
        historyIndex: 0,
        commandHistory: []
      };
    },
    props: {
      defaultTask: {
        required: false,
        default: 'defaultTask'
      },
      commandList: {
        required: false,
        default: () => { return {}}
      },
      taskList: {
        required: false,
        default: () => { return {}}
      }
    },
    computed: {
      lastLineClass() {
        if (this.lastLineContent === '&nbsp') {
          return 'cursor'
        } else if (this.lastLineContent === '...') {
          return 'loading'
        }
      }
    },
    created() {
      this.supportingCommandList = Object.keys(this.commandList).concat(Object.keys(this.taskList))
      this.handleRun(this.defaultTask).then(() => {
        this.pushToList({ level: 'System', message: 'Type "help" to get a supporting command list.' })
        this.handleFocus()
      })
    },
    methods: {
      handleFocus() {
        this.$refs.inputBox.focus();
      },
      handleCommand(e) {
        if (e.keyCode !== 13) {
          this.handlekeyEvent(e)
          return
        }
        this.commandHistory.push(this.inputCommand)
        this.historyIndex = this.commandHistory.length
        this.pushToList({ message: `$ \\ ${this.title} ${this.inputCommand} ` })
        if (!this.inputCommand) return;
        const commandArr = this.inputCommand.split(' ')
        if (commandArr[0] === 'help') {
          this.printHelp(commandArr[1])
        } else if (this.commandList[this.inputCommand]) {
          this.commandList[this.inputCommand].messages.map(item => this.pushToList(item))
        } else if (this.taskList[this.inputCommand.split(' ')[0]]) {
          this.handleRun(this.inputCommand.split(' ')[0], this.inputCommand)
        } else {
          this.pushToList({ level: 'System', message: 'Unknown Command.' })
          this.pushToList({ level: 'System', message: 'type "help" to get a supporting command list.' })
        }
        this.inputCommand = ''
        this.autoScroll()
      },
      handlekeyEvent(e) {
        switch (e.keyCode) {
          case 38:
            this.historyIndex = this.historyIndex === 0 ? 0 : this.historyIndex - 1
            this.inputCommand = this.commandHistory[this.historyIndex]
            break;
          case 40:
            this.historyIndex = this.historyIndex === this.commandHistory.length ? this.commandHistory.length : this.historyIndex + 1
            this.inputCommand = this.commandHistory[this.historyIndex]
            break;
          default:
            break;
        }
      },
      handleRun(taskName, input) {
        this.lastLineContent = '...'
        return this.taskList[taskName][taskName](this.pushToList, input).then(done => {
          this.pushToList(done)
          this.lastLineContent = '&nbsp'
        }).catch(error => {
          this.pushToList(error || { type: 'error', label: 'Error', message: 'Something went wrong!' })
          this.lastLineContent = '&nbsp'
        })
      },
      pushToList(message) {
        this.messageList.push(message)
        this.autoScroll()
      },
      printHelp(input) {
        if (!input) {
          this.pushToList({ message: 'Here is a list of supporting command.' })
          this.supportingCommandList.map(command => {
            if (this.commandList[command]) {
              this.pushToList({ type: 'success', label: command, message: '---> ' + this.commandList[command].description })
            } else {
              this.pushToList({ type: 'success', label: command, message: '---> ' + this.taskList[command].description })
            }
            return undefined
          })
          this.pushToList({ message: 'Enter help <command> to get help for a particular command.' })
        } else {
          const command = this.commandList[input] || this.taskList[input]
          this.pushToList({ message: command.description })
        }
        this.autoScroll()
      },
      time() {
        return new Date().toLocaleTimeString().split('').splice(2).join('')
      },
      autoScroll() {
        this.$nextTick(() => {
          this.$refs.terminalWindow.scrollTop = this.$refs.terminalLastLine.offsetTop;
        })
      }
    }
  };

</script>

<style scoped lang="scss">
.terminal {
  position: relative;
  width: 100%;
  border-radius: 4px;
  color: white;
  margin-bottom: 10px;
  max-height: 580px;
}

.terminal .terminal-window {
  padding-top: 50px;
  background-color: rgb(3, 9, 36);
  min-height: 140px;
  padding: 20px;
  font-weight: normal;
  font-family: Monaco, Menlo, Consolas, monospace;
  color: #fff;
  pre {
    font-family: Monaco, Menlo, Consolas, monospace;
    white-space: pre-wrap;
  }
  p {
    overflow-wrap: break-word;
    word-break: break-all;
    font-size: 13px;
    .cmd {
      line-height: 24px;
    }
    .info {
      padding: 2px 3px;
      background: #2980b9;
    }
    .warning {
      padding: 2px 3px;
      background: #f39c12; // https://github.com/Mayccoll/Gogh/blob/master/content/themes.md #Flat
    }
    .success {
      padding: 2px 3px;
      background: #27ae60;
    }
    .error {
      padding: 2px 3px;
      background: #c0392b;
    }
    .system {
      padding: 2px 3px;
      background: #bdc3c7;
    }
  }
  pre {
    display: inline;

  }
}

.terminal .header ul.shell-dots li {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: rgb(3, 9, 36);
  margin-left: 6px
}

.terminal .header ul.shell-dots li.red {
  background-color: rgb(200, 48, 48);
}

.terminal .header ul.shell-dots li.yellow {
  background-color: rgb(247, 219, 96);
}

.terminal .header ul.shell-dots li.green {
  background-color: rgb(46, 201, 113);
}

.terminal .header {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgb(149, 149, 152);
  text-align: center;
  padding: 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px
}

.terminal .header h4 {
  font-size: 14px;
  margin: 5px;
  letter-spacing: 1px;
}

.terminal .header ul.shell-dots {
  position: absolute;
  top: 5px;
  left: 8px;
  padding-left: 0;
  margin: 0;
}

.terminal .terminal-window .prompt::before {
  content: "$";
  margin-right: 10px;
}

.terminal .terminal-window .cursor {
  margin: 0;
  background-color: white;
  animation: blink 1s step-end infinite;
  -webkit-animation: blink 1s step-end infinite;
  margin-left: -5px;
}

@keyframes blink {
  50% {
    visibility: hidden;
  }
}

@-webkit-keyframes blink {
  50% {
    visibility: hidden;
  }
}

.terminal .terminal-window .loading {
  display: inline-block;
  width: 0;
  overflow: hidden;
  animation: load 1.2s step-end infinite;
  -webkit-animation: load 1.2s step-end infinite;
}

@keyframes load {
  0% {
    width: 0px;
  }
  20% {
    width: 5px;
  }
  40% {
    width: 10px;
  }
  60% {
    width: 15px;
  }
  80% {
    width: 20px;
  }
}

@-webkit-keyframes load {
  0% {
    width: 0px;
  }
  20% {
    width: 5px;
  }
  40% {
    width: 10px;
  }
  60% {
    width: 15px;
  }
  80% {
    width: 20px;
  }
}
.terminal-last-line {
  font-size: 0;
  word-spacing: 0;
  letter-spacing: 0;
}
.input-box {
  position: relative;
  background:  rgb(3, 9, 36);
  border: none;
  width: 1px;
  opacity: 0;
  cursor: default;
}
.input-box:focus{
  outline: none;
  border: none;
}
</style>
