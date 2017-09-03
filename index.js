#! /usr/bin/env node

const fs   = require("fs");
const args = process.argv;
const switchStringLiterals = require("./q2q").switchStringLiterals

// Check arguments
if (!(args[2] && args[3] && args[4]) || (args[2] !== "single" && args[2] !== "double")) {
  console.log(`
Usage: q2q [single|double] src.js out.js
`);

  process.exit();
}

// Load the JS file transform it
const pref  = args[2] === "single" ? "'" : '"';
const js    = fs.readFileSync(args[3], {encoding: "utf8"});
const outJS = switchStringLiterals(js, pref);

// Save to dest
fs.writeFileSync(args[4], outJS, {encoding: "utf8"});
