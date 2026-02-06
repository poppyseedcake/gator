import { setUser, readConfig } from './config'; 

function main() {
  setUser("Wojtek");
  const config = readConfig();
  console.log(config);
}

main();
