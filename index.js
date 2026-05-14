'use strict';

const creeps = require('./creeps.json');

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

function createRandomPicker(items) {
    let remaining = [];

    return function random() {
        if (remaining.length === 0) {
            remaining = items.slice();
        }

        const index = getRandomIndex(remaining.length);
        const value = remaining[index];
        remaining.splice(index, 1);

        return value;
    };
}

function getCreepWords() {
    return creeps
        .flatMap(creep => creep.split(/\s+/))
        .filter(word => /^[a-z]+$/i.test(word));
}

function createPassword() {
    const pool = getCreepWords();
    const words = [];

    while (words.length < 4) {
        const index = getRandomIndex(pool.length);
        const word = pool[index].toLowerCase();

        pool.splice(index, 1);
        words.push(word);
    }

    const wordIndex = getRandomIndex(words.length);
    words[wordIndex] = words[wordIndex].charAt(0).toUpperCase() + words[wordIndex].slice(1);

    return `${words.join('.')}${getRandomIndex(10)}`;
}

module.exports = {
    all: creeps,
    random: createRandomPicker(creeps),
    password: createPassword,
    next: function(currentCreep) {
        const curIndex = creeps.findIndex(
            singleCreep =>
                singleCreep.toLowerCase() === currentCreep.toLowerCase()
        );
        return creeps[curIndex + 1] ? creeps[curIndex + 1] : creeps[0];
    }
};
