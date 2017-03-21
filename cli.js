#!/usr/bin/env node
'use strict';
var meow = require('meow');
var creeps = require('./');

var cli = meow({
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
    console.log(creeps.all.join('\n'));
} else if (cli.flags.next) {
    console.log(creeps.next(cli.flags.next));
} else {
    console.log(creeps.random());
}
