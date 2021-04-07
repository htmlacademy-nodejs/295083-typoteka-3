'use strict';

const {Cli} = require(`./cli`);
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;

const [userCommand, userParameter] = process.argv.slice(USER_ARGV_INDEX);

if (userCommand && Cli[userCommand]) {
  Cli[userCommand].run(userParameter);
} else {
  Cli[DEFAULT_COMMAND].run();
}

