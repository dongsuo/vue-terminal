const mockData = [
    { time: new Date().toLocaleTimeString(), level: 'Info', message: 'Terminal Initializing ............' },
    { time: new Date().toLocaleTimeString(), level: 'Warning', message: 'This is a Waning Message!' },
    { time: new Date().toLocaleTimeString(), level: 'Error', message: 'Oops, Something Went Wrong!' },
    { time: new Date().toLocaleTimeString(), level: 'Success', message: 'Take it easy! Everything OK!' }
]

export default {
  echo: {
    description: '',
    echo(messageList, input) {
      input = input.split(' ')
      input.splice(0, 1)
      const p = new Promise(resolve => {
        messageList.push({ time: new Date().toLocaleTimeString().split('').splice(2).join(''), message: input.join(' ') });
        resolve({ type: 'success', message: 'done!' })
      })
      return p
    }
  },
  example: {
    description: 'Run an example to show you what this project can do.',
    example(messageList) {
      let i = 0;
      const p = new Promise(resolve => {
        const interval = setInterval(() => {
          mockData[i].time = new Date().toLocaleTimeString().split('').splice(2).join('')
          messageList.push(mockData[i]);
          i++
          if (!mockData[i]) {
            clearInterval(interval)
            resolve({ type: 'success', message: 'Terminal Initialized Successfully!' })
          }
        }, 1000);
      })
      return p
    }
  }

}