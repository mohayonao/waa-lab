"use strict";

const fs = require("fs");
const path = require("path");

function isDirectory(filePath) {
  return fs.statSync(filePath).isDirectory();
}

function isMarkdown(filePath) {
  return /\.md$/.test(filePath);
}

function getTitleFromDirectory(dirPath) {
  let filePath = path.join(dirPath, "README.md");

  try {
    return getTitleFromMarkdown(filePath);
  } catch (e) {}

  return null;
}

function getTitleFromMarkdown(filePath) {
  return fs.readFileSync(filePath).toString().trim().split("\n")[0].replace(/^#\s*/, "");
}

const ReadMeHeader = `
# Web Audio API Laboratory

This repository is a collection of experimental code for Web Audio API.

## Works

`;

const ReadMeFooter = `
## License
MIT
`;

let readMe = "";

readMe += ReadMeHeader.trimLeft();

fs.readdirSync(__dirname).sort().forEach((category) => {
  let dirPath = path.join(__dirname, category);

  if (/^[._]/.test(category) || !isDirectory(dirPath)) {
    return;
  }

  readMe += `### ${ category }\n\n`;

  fs.readdirSync(dirPath).sort().forEach((fileName) => {
    let filePath = path.join(dirPath, fileName);
    let title = null;

    if (isDirectory(filePath)) {
      title = getTitleFromDirectory(filePath) || fileName;
    } else if (isMarkdown(filePath)) {
      title = getTitleFromMarkdown(filePath);
    }

    if (title) {
      readMe += `  - [${ title }](${ category }/${ fileName })\n`;
    }
  });

  readMe += "\n";
});

readMe += ReadMeFooter.trimLeft();

fs.writeFileSync(path.join(__dirname, "README.md"), readMe);
