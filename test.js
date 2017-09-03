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
