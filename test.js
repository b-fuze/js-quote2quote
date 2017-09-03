const switchStringLiterals = require('./q2q.js').switchStringLiterals;
const opposite = require('./q2q.js').opposite;

test('swap single quote for double quote', () => {
  expect(opposite(`'`)).toBe(`"`);
});

test('swap double quote to single quote', () => {
  expect(opposite(`"`)).toBe(`'`);
});

test('replace all single quotes to doubles quotes', () => {
  const input  = `'sample' \`source\` "string" 'yep' "sure"`;
  const output = `"sample" \`source\` "string" "yep" "sure"`;
  expect(switchStringLiterals(input, `"`)).toBe(output);
});

test('replace all double quotes to single quotes', () => {
  const input  = `'sample' \`source\` "string" 'yep' "sure"`;
  const output = `'sample' \`source\` 'string' 'yep' 'sure'`;
  expect(switchStringLiterals(input, `'`)).toBe(output);
});

// not sure how to name this test
// should prob be rewritten
test('complete in/out from the example', () => {
  const fs = require('fs');
  const input  = fs.readFileSync('./test-in.js', {encoding: "utf8"});
  const output = fs.readFileSync('./test-out.js', {encoding: "utf8"});
  expect(switchStringLiterals(input, `"`)).toBe(output);
});

test('avoid replacing quotes inside // comments', () => {
  const input  = `// this is a comment with 'single' and "double" quotes`;
  const output = `// this is a comment with 'single' and "double" quotes`;
  expect(switchStringLiterals(input, `'`)).toBe(output);
  expect(switchStringLiterals(input, `"`)).toBe(output);
});

test('avoid replacing quotes inside /* */ comments', () => {
  const input  = `/* this is a comment with 'single' and "double" quotes */`;
  const output = `/* this is a comment with 'single' and "double" quotes */`;
  expect(switchStringLiterals(input, `'`)).toBe(output);
  expect(switchStringLiterals(input, `"`)).toBe(output);
});

test('avoid replacing quotes inside multiline /* */ comments', () => {
  const input  = `/* this is a multiline
                   * comment with 'single'
                   * and "double" quotes
                   */`;
  const output = `/* this is a multiline
                   * comment with 'single'
                   * and "double" quotes
                   */`;
  expect(switchStringLiterals(input, `'`)).toBe(output);
  expect(switchStringLiterals(input, `"`)).toBe(output);
});

test('avoid replacing quotes inside <!-- --> comments', () => {
  const input  = `<!-- this is a comment with 'single' and "double" quotes -->`;
  const output = `<!-- this is a comment with 'single' and "double" quotes -->`;
  expect(switchStringLiterals(input, `'`)).toBe(output);
  expect(switchStringLiterals(input, `"`)).toBe(output);
});

test('avoid replacing quotes inside multiline <!-- --> comments', () => {
  const input  = `<!-- this is a multiline
                       comment with 'single'
                       and "double" quotes
                   -->`;
  const output = `<!-- this is a multiline
                       comment with 'single'
                       and "double" quotes
                   -->`;
  expect(switchStringLiterals(input, `'`)).toBe(output);
  expect(switchStringLiterals(input, `"`)).toBe(output);
});

// not entirely sure of the escape going on here, could prob be easier with an input/ouput file
test('replaces quotes inside string literals', () => {
  const input  = '`Hey, ${ user["name"] }!`';
  const output = "`Hey, ${ user['name'] }!`";
  expect(switchStringLiterals(input, `'`)).toBe(output);
});

// not entirely sure of the escape going on here, could prob be easier with an input/ouput file
test('replaces quotes inside string literals', () => {
  const input  = "`Hey, ${ user['name'] }!`";
  const output = '`Hey, ${ user["name"] }!`';
  expect(switchStringLiterals(input, `'`)).toBe(output);
});
