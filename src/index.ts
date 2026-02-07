import { CommandsRegistry, registerCommand, readConfig, handlerLogin, runCommand } from './config'; 
import { argv, exit } from 'node:process';

function main() {
  const myargs = argv.slice(2);
  if(myargs.length <= 1) {
    console.log("Dodaj argumenty");
    exit(1);
  }

  const cmdName = myargs[0];
  const rest_args = myargs.slice(1);

  const cmdRegitry: CommandsRegistry = {};
  registerCommand(cmdRegitry, "login", handlerLogin);

  runCommand(cmdRegitry, cmdName, ...rest_args);

  const config = readConfig();
  console.log(config);
}

main();
