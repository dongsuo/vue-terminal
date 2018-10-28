const commandList = {
  version: {
    description: 'Return this project version',
    messages: [
      { message: '1.0.0' }
    ]
  },
  contact: {
    description: 'How to contact author',
    messages: [
    { message: 'Website: http://xiaofeixu.cn' },
    { message: 'Email: xuxiaofei915@gmail.com' },
    { message: 'Github: https://github.com/dongsuo' },
    { message: 'WeChat Offical Account: dongsuo' }
    ] },
  about: {
    description: 'About author',
    messages: [
    { message: 'My name is xu xiaofei. I\'m a programmer, You can visit my personal website at http://xiaofeixu.cn to learn more about me.' }
    ]
  },
  readme: {
    description: 'About this project.',
    messages: [
    { message: 'This is a component that emulates a command terminal in Vue' }
    ] },
  document: {
    description: 'Document of this project.',
    messages: [
      { message: {
        text: 'Under Construction',
        list: [
        { label: 'hello', type: 'error', message: 'this is a test message' }
        ]
      } }]
  }
}
