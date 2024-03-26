import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'
import { writeFileSync } from 'fs'
import 'dotenv/config'

console.log(`

To set up this project you need to provide your Project ID for Sanity.

You can find all the needed information in Sanity under:

${chalk.yellow(
  `https://www.sanity.io/manage ${chalk.red('->')} Your Project Name ${chalk.red(
    '->'
  )} PROJECT ID`
)}

The ${chalk.green('Sanity Project ID')}
  will be used to read and write content from adn to your space.

The ${chalk.green('Sanity Dataset')}
  will be used to store your content.

Ready? Let's do it! 🎉

`)

const questions = [
  {
    name: 'sanityProjectId',
    when: !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    message: 'Your Sanity Project ID',
  },
  {
    name: 'sanityDataset',
    when: !process.env.NEXT_PUBLIC_SANITY_DATASET,
    message: 'Your Sanity Dataset',
    type: 'list',
    choices: ['production', 'staging', 'testing'],
  },
]

inquirer
  .prompt(questions)
  .then(({ sanityProjectId, sanityDataset }) => {
    const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET } =
      process.env

    // env vars are given precedence followed by input given to prompts displayed by the setup script
    sanityProjectId = NEXT_PUBLIC_SANITY_PROJECT_ID || sanityProjectId
    sanityDataset = NEXT_PUBLIC_SANITY_DATASET || sanityDataset

    console.log('Writing config file...\n')
    const configFiles = ['.env'].map((file) => path.join(path.resolve(), file))

    const fileContents =
      [
        '# Warning: Do not add secrets (API keys and similar) to this file, as it source controlled!',
        '# Use `.env.local` for any secrets, and ensure it is not added to source control',
        '',
        `NEXT_PUBLIC_SANITY_PROJECT_ID="${sanityProjectId}"`,
        `NEXT_PUBLIC_SANITY_DATASET="${sanityDataset}"`,
      ].join('\n') + '\n'

    configFiles.forEach((file) => {
      writeFileSync(file, fileContents, 'utf8')
      console.log(`Config file ${chalk.yellow(file)} written.\n`)
    })
  })
  .then((_, error) => {
    console.log(
      `All set! You can now run ${chalk.yellow('npm run dev')} to see it in action.`
    )
  })
  .catch((error) => console.error(error))
