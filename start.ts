import * as readline from "readline";
import * as tsNode from "ts-node";
import * as path from "path";

// Create an interface to read user input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Insert the day: ", (folder) => {
  if (!folder) {
    console.log("Please provide a folder name.");
  } else {
    let numbDay = +folder;

    if (numbDay < 10) folder = "0" + numbDay;

    const filePath = path.resolve(__dirname, `./${folder}/index.ts`); // Get the absolute path of the TypeScript file

    // Register ts-node to transpile TypeScript files
    tsNode.register();

    // Dynamically require the module
    const module = require(filePath);

    // Call the execute function in the required module
    if (module.execute) {
      module.execute();
    } else {
      console.log("No execute function found in the module.");
    }

    process.exit(0);
  }
});
