"use strict";

const fs = require("fs");
const path = require("path");

function directoryOnly(filename) {
  return !/^\.\w+$/.test(filename) && fs.statSync(filename).isDirectory();
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

readMe += ReadMeHeader;

fs.readdirSync(__dirname).filter(directoryOnly).sort().forEach((title) => {
  if (!/^_/.test(title)) {
    readMe += `  - [${ title }](${ title })\n`;
  }
});

readMe += ReadMeFooter;
readMe = readMe.trimLeft();

fs.writeFileSync(path.join(__dirname, "README.md"), readMe);
