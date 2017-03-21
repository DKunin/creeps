'use strict';
var uniqueRandomArray = require('unique-random-array');
var creeps = require('./creeps.json');

module.exports = {
    all: creeps,
    random: uniqueRandomArray(creeps),
    next: function(currentCreep) {
        const curIndex = creeps.findIndex(
            singleCreep =>
                singleCreep.toLowerCase() === currentCreep.toLowerCase()
        );
        return creeps[curIndex + 1] ? creeps[curIndex + 1] : creeps[0];
    }
};
