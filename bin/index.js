#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import { execSync } from "child_process";
import url from "url";
import chalk from "chalk";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function main() {
  console.log(chalk.green("create-mern — MERN starter generator\n"));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-mern-app",
    },
    {
      type: "input",
      name: "dbName",
      message: "MongoDB database name:",
      default: "mydb",
    },
    {
      type: "input",
      name: "backendPort",
      message: "Backend dev port:",
      default: 5000,
    },
    {
      type: "input",
      name: "frontendPort",
      message: "Frontend dev port:",
      default: 5173,
    },
  ]);

  const projectPath = path.join(process.cwd(), answers.projectName);
  const backendPath = path.join(projectPath, "backend");
  const frontendPath = path.join(projectPath, "frontend");

  fs.ensureDirSync(projectPath);

  console.log(chalk.blue("\nSetting up backend..."));

  await fs.copy(path.join(__dirname, "../templates/backend"), backendPath);

  // Create backend .env
  const backendEnv = `PORT=${answers.backendPort}
MONGO_URI=mongodb://127.0.0.1:27017/${answers.dbName}
FRONTEND_URL=http://localhost:${answers.frontendPort}
`;
  fs.writeFileSync(path.join(backendPath, ".env"), backendEnv);

  // Init npm
  execSync("npm init -y", { cwd: backendPath, stdio: "inherit" });

  // Add type and scripts to package.json
  const backendPackagePath = path.join(backendPath, "package.json");
  const backendPackage = JSON.parse(fs.readFileSync(backendPackagePath, "utf-8"));
  backendPackage.type = "module";
  backendPackage.scripts = {
    start: "node server.js",
    dev: "nodemon server.js"
  };
  fs.writeFileSync(
    backendPackagePath,
    JSON.stringify(backendPackage, null, 2)
  );

  execSync(
    "npm install express mongoose cors dotenv cookie-parser method-override",
    { cwd: backendPath, stdio: "inherit" }
  );
  execSync("npm install --save-dev nodemon", {
    cwd: backendPath,
    stdio: "inherit",
  });

  console.log(chalk.green("Backend ready."));

  // Frontend setup
  console.log(chalk.blue("\nSetting up frontend (Vite + React)..."));
  try {
    execSync(`npm create vite@latest frontend -- --template react`, {
      cwd: projectPath,
      stdio: 'pipe',
    });
    console.log(chalk.green("Frontend scaffolded."));
  } catch (err) {
    console.log(chalk.red("Frontend scaffold failed!"));
    console.error(err.stderr.toString());
  }

  // Custom frontend template
  await fs.copy(
    path.join(__dirname, "../templates/frontend/src"),
    path.join(frontendPath, "src"),
    { overwrite: true }
  );

  // Create frontend .env
  const frontendEnv = `VITE_API_BASE_URL=http://localhost:${answers.backendPort}/api
`;
  fs.writeFileSync(path.join(frontendPath, ".env"), frontendEnv);

  // Install frontend dependencies
  execSync("npm install axios react-router-dom", {
    cwd: frontendPath,
    stdio: "inherit",
  });
  console.log(chalk.green("Frontend ready.\n"));
  console.log(chalk.green(`\nAll done!`));
  console.log(chalk.yellow(`Project path: ${projectPath}`));
  console.log(chalk.cyan("Next steps:"));
  console.log(
    chalk.cyan(
      `\nNext steps:\n 1) Start backend: cd ${backendPath} && npm run dev\n 2) Start frontend: cd ${frontendPath} && npm run dev`
    )
  );
}

main();
