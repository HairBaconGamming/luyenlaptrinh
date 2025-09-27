const recursionTopics = require('./recursion');
const dpTopics = require('./dynamic-programming');
const binaryTopics = require('./binary');
const greedyTopics = require('./greedy');
console.log('Greedy topics loaded:', greedyTopics.length, greedyTopics.map(t => t.title));
const graphsTopics = require('./graphs');
const algorithmicThinkingTopics = require('./algorithmic-thinking');
const algorithmApplicationsTopics = require('./algorithm-applications');

const topics = [
    ...recursionTopics,
    ...algorithmicThinkingTopics,
    ...dpTopics,
    ...binaryTopics,
    ...greedyTopics,
    ...graphsTopics,
    ...algorithmApplicationsTopics,
];

module.exports = topics;
