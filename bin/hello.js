const chalk = require('chalk')
const pkg = require('../package.json')

console.log(`

${chalk.green('Hey there! 👋')}

Thanks for giving ${pkg.name} a try 🎉
To get you going this project includes a setup step

${chalk.yellow.bold('npm run setup')} automates the following steps for you:
  - creates a public env file ${chalk.yellow('./.env')}
  - creates a private env file ${chalk.yellow('./.env.local')}

When this is done run:

${chalk.yellow('npm run dev')} to start a development environment at ${chalk.green('http://localhost:3000')}

or

${chalk.yellow('npm run build')} to create a production ready site in ${chalk.green('./next')}

---

You can access Sanity Studio at ${chalk.green('http://localhost:3000/admin')} to edit any content on the site

For further information check the README of the project

${chalk.green('Happy chatting! 🚀')}

`)
