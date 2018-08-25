<template>
  <div id="app">
    <vue-terminal-emulator :commandList="commandList" :taskList="taskList"></vue-terminal-emulator>
  </div>
</template>

<script>

import VueTerminalEmulator from './components/VueTerminalEmulator'
import commandList from './plugins/commandList'
import taskList from './plugins/taskList'

export default {
  name: 'app',
  components: { VueTerminalEmulator },
  data() {
    return {
      commandList,
      taskList
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
