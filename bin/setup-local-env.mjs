#!/usr/bin/env node

import { spawn } from 'node:child_process'
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

function run(command, arg) {
  return new Promise((resolve, reject) => {
    const stream = spawn(command, arg);

    stream.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    stream.stderr.on('data', (data) => {
      console.error(data.toString());
    })

    stream.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (code === 0) {
        resolve()
      } else {
        reject()
      }
    });
  })
}

async function askAndRunOrNot(question, command, arg) {
  if (!question) {
    console.log('canceled')
    return 0
  } else {
    await run(command, arg)
  }
}

(async () => {
  // TODO: implement workaround for Windows
  await askAndRunOrNot(await askDockerStart(),'npm', ['run', 'docker:start-testdb'])
  await askAndRunOrNot(await askMigration(),'npm', ['run', 'migrate:test'])
})()
