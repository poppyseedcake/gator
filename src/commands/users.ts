import { createUser, getUser } from "../lib/db/queries/users";
import { setUser } from "../config";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  const userName = args[0];
  
  const checkUser = await getUser(userName);
  if(!checkUser) {
    throw new Error(`User ${userName} does not exist.`);

  }

  setUser(userName);
  console.log("User switched successfully!");
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }
  console.log("debug print1");

  const userName = args[0];
  try {
    const checkUser = await getUser(userName);
    console.log("debug print2 ", checkUser);
  } catch(e) {
    console.error("get user failed", e);
    throw e;
  }

  //if(checkUser) {
  //  throw new Error(`user ${userName} already exists.`);
  //}

  const result = await createUser(userName);
  setUser(userName); 
  console.log("User created successfully!");
  console.log(await getUser(userName));
}