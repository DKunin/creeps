#!/usr/bin/env node
'use strict';

const meow = require('meow');
const creeps = require('./');

const cli = meow({
    help: [
        'Examples',
        '  $ creeps',
        '  Tooth fairy',
        '',
        '  $ creeps --all',
        '  Jeff the killer',
        '  Jeffrey Dahmer',
        '  ...',
        '',
        'Options',
        '  --all   Get all names instead of a random name',
        '  --next <CREEP> Get next name inline after current creep'
    ]
});

if (cli.flags.all) {
    // eslint-disable-next-line
    console.log(creeps.all.join('\n'));
} else if (cli.flags.next) {
    // eslint-disable-next-line
    console.log(creeps.next(cli.flags.next));
} else {
    // eslint-disable-next-line
    console.log(creeps.random());
}
