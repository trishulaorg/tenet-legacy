#!/usr/bin/env node

import { exec } from 'node:child_process'
import inquirer from 'inquirer'

async function askDockerStart() {
  const result = await inquirer.prompt({
    type: 'confirm',
    name: 'docker',
    message: 'Do you want to start docker?',
    default: true,
  })

  return result.docker
}

async function askMigration() {
  const result = await inquirer.prompt({
    type: 'confirm',
    name: 'migration',
    message: 'Do you want to run DB migration?',
    default: true,
  })

  return result.migration
}

async function askSeeding() {
  const result = await inquirer.prompt({
    type: 'confirm',
    name: 'seeding',
    message: 'Do you want to run DB seeding?',
    default: true,
  })

  return result.seeding
}

function run(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject();
        return;
      }
      console.log(stdout);
      console.error(stderr);
      resolve();
    });
  })
}

async function askAndRunOrNot(question, command) {
  if (!question) {
    console.log('canceled')
    return 0
  } else {
    await run(command)
  }
}

(async () => {
  // TODO: implement workaround for Windows
  await askAndRunOrNot(await askDockerStart(),'npm run docker:start-testdb')
  await askAndRunOrNot(await askMigration(),'npm run migrate:test')
  await askAndRunOrNot(await askSeeding(),'npm run seed:test')
})()
