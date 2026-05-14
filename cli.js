#!/usr/bin/env node
'use strict';

const creeps = require('./');
const packageJson = require('./package.json');

const helpText = `Usage
  $ creeps [--all]
  $ creeps --next <name>
  $ creeps password

Examples
  $ creeps
  Tooth fairy

  $ creeps --all
  Jeff the killer
  Jeffrey Dahmer
  ...

  $ creeps --next Crow
  Damien

  $ creeps password
  crow.damien.Dracula.hades7

Options
  --all           Get all names instead of a random name
  --next <name>   Get next name after the provided name
  --version       Show package version
  --help          Show help`;

const args = process.argv.slice(2);

function printHelp() {
    console.log(helpText);
}

function fail(message) {
    console.error(message);
    console.error('Run `creeps --help` for usage.');
    process.exitCode = 1;
}

function hasFlag(name) {
    const prefix = `${name}=`;
    return args.includes(name) || args.some(argument => argument.startsWith(prefix));
}

function getFlagValue(name) {
    const index = args.indexOf(name);

    if (index !== -1) {
        return args[index + 1];
    }

    const prefix = `${name}=`;
    const flag = args.find(argument => argument.startsWith(prefix));

    if (!flag) {
        return undefined;
    }

    return flag.slice(prefix.length);
}

const hasNextFlag = hasFlag('--next');
const currentCreep = getFlagValue('--next');

if (args[0] === 'password') {
    console.log(creeps.password());
} else if (args.includes('--help') || args.includes('-h')) {
    printHelp();
} else if (args.includes('--version')) {
    console.log(packageJson.version);
} else if (args.includes('--all')) {
    console.log(creeps.all.join('\n'));
} else if (hasNextFlag) {
    if (!currentCreep || currentCreep.startsWith('--')) {
        fail('Missing value for --next.');
    } else {
        console.log(creeps.next(currentCreep));
    }
} else {
    console.log(creeps.random());
}
