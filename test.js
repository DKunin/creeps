'use strict';

import execa from 'execa';
import test from 'ava';
import creeps from './creeps.json';

test('test result', async t => {
    const creepyName = await execa.stdout('./cli.js');
    t.true(creeps.includes(creepyName));
});

test('test all', async t => {
    const creepyName = await execa.stdout('./cli.js', ['--all']);
    const result = creepyName.split('\n').every(singleCreep => {
        return creeps.includes(singleCreep);
    });
    t.true(result);
});

test('test next', async t => {
    const creepyName = await execa.stdout('./cli.js', ['--next', creeps[0]]);
    t.is(creepyName, creeps[1], `${creepyName}, ${creeps[1]}`);
});
