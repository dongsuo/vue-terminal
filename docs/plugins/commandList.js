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
    { message: 'Website: https://islasher.com' },
    { message: 'Email: xuxiaofei915@gmail.com' },
    { message: 'Github: https://github.com/dongsuo' },
    { message: 'WeChat Offical Account: dongsuo' }
    ] },
  about: {
    description: 'About author',
    messages: [
    { message: 'My name is xu xiaofei. I\'m a programmer, You can visit my personal website at https://islasher.com to learn more about me.' }
    ]
  },
  readme: {
    description: 'About this project.',
    messages: [
    { message: 'This is a component that emulates a command terminal in browser.' }
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
  },
  'git help': {
    description: 'git help',
    messages: [
      {
        message: `usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
          [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
          [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
          [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
          <command> [<args>]

          These are common Git commands used in various situations:

          start a working area (see also: git help tutorial)
            clone      Clone a repository into a new directory
            init       Create an empty Git repository or reinitialize an existing one

          work on the current change (see also: git help everyday)
            add        Add file contents to the index
            mv         Move or rename a file, a directory, or a symlink
            reset      Reset current HEAD to the specified state
            rm         Remove files from the working tree and from the index

          examine the history and state (see also: git help revisions)
            bisect     Use binary search to find the commit that introduced a bug
            grep       Print lines matching a pattern
            log        Show commit logs
            show       Show various types of objects
            status     Show the working tree status

          grow, mark and tweak your common history
            branch     List, create, or delete branches
            checkout    Switch branches or restore working tree files
            commit     Record changes to the repository
            diff       Show changes between commits, commit and working tree, etc
            merge      Join two or more development histories together
            rebase     Reapply commits on top of another base tip
            tag        Create, list, delete or verify a tag object signed with GPG

          collaborate (see also: git help workflows)
            fetch      Download objects and refs from another repository
            pull       Fetch from and integrate with another repository or a local branch
            push       Update remote refs along with associated objects

          'git help -a' and 'git help -g' list available subcommands and some
          concept guides. See 'git help <command>' or 'git help <concept>'
          to read about a specific subcommand or concept.
          `
      }
    ]
  }
}
