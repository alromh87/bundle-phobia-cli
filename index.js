#!/usr/bin/env node

const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const c = require('chalk');
const argv = require('yargs')
    .usage('Usage: $0 <package-names...>')
    .describe('range', 'Get a range of version (0 for all, 8 by default)').alias('range', 'r').number('range')
    .describe('json', 'Output json rather than a formater string').alias('json', 'j').boolean('j')
    .describe('size', 'Output just the module size').alias('size', 's').boolean('s')
    .describe('gzip-size', 'Output just the module gzip size').alias('gzip-size', 'g').boolean('g')
    .describe('dependencies', 'Output just the number of dependencies').alias('dependencies', 'd').boolean('d')
    .help('h').alias('h', 'help')
    .argv;

const {main} = require('./src/core');

if (!module.parent) {
    main(argv).catch(err => {
        console.log(c.red(err.message))
        process.exit(1);
    })
    updateNotifier({pkg}).notify();
}
