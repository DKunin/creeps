'use strict';

const assert = require('node:assert/strict');
const { execFile } = require('node:child_process');
const test = require('node:test');
const { promisify } = require('node:util');

const creeps = require('./');
const creepNames = require('./creeps.json');

const execFileAsync = promisify(execFile);

async function runCli(args = []) {
    const { stdout } = await execFileAsync(process.execPath, [ './cli.js', ...args ]);
    return stdout.trimEnd();
}

test('cli prints a random creep name', async () => {
    const creepyName = await runCli();
    assert.ok(creepNames.includes(creepyName));
});

test('cli prints all names in source order', async () => {
    const creepyNames = await runCli([ '--all' ]);
    assert.deepEqual(creepyNames.split('\n'), creepNames);
});

test('cli prints next name after a given name', async () => {
    const creepyName = await runCli([ '--next', creepNames[0] ]);
    assert.equal(creepyName, creepNames[1]);
});

test('cli prints generated password', async () => {
    const password = await runCli([ 'password' ]);

    assertPassword(password);
});

test('cli accepts --next=value form', async () => {
    const creepyName = await runCli([ `--next=${creepNames[0]}` ]);
    assert.equal(creepyName, creepNames[1]);
});

test('cli prints package version', async () => {
    const packageJson = require('./package.json');
    const version = await runCli([ '--version' ]);

    assert.equal(version, packageJson.version);
});

test('next lookup is case-insensitive', () => {
    assert.equal(creeps.next(creepNames[0].toUpperCase()), creepNames[1]);
});

test('password uses four creep words, one capitalized word, and trailing digit', () => {
    assertPassword(creeps.password());
});

test('cli rejects missing --next value', async () => {
    await assert.rejects(
        execFileAsync(process.execPath, [ './cli.js', '--next' ]),
        { code: 1 }
    );
});

function assertPassword(password) {
    const creepWords = new Set(
        creepNames
            .flatMap(creep => creep.split(/\s+/))
            .filter(word => /^[a-z]+$/i.test(word))
            .map(word => word.toLowerCase())
    );
    const digit = password.at(-1);
    const words = password.slice(0, -1).split('.');

    assert.match(digit, /^\d$/);
    assert.equal(words.length, 4);
    assert.equal(words.filter(word => /^[A-Z]/.test(word)).length, 1);

    for (const word of words) {
        assert.match(word, /^[A-Za-z]+$/);
        assert.ok(creepWords.has(word.toLowerCase()));
    }
}
