import { exec } from "child_process";

const tagArgs = process.argv.slice(2);

if (tagArgs.length === 0) {
  console.error("Please provide one or more tags. Example: npm run test:tags \"@login or @smoke\"");
  process.exit(1);
}

const tagExpression = tagArgs.join(" ");

const command = `npx cucumber-js --profile default --tags "${tagExpression}"`;

console.log(`Running Cucumber tests with tags: ${tagExpression}\n`);

const processExec = exec(command);

processExec.stdout?.on("data", (data) => {
  console.log(data);
});

processExec.stderr?.on("data", (data) => {
  console.error(data);
});

processExec.on("close", (code) => {
  console.log(`Cucumber finished with exit code ${code}`);
});
