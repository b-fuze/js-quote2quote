# js-quote2quote
Converts all Javascript string literals (excluding template strings) to either single quote or double quote strings

It isn't a mere search & replace, it's basically a dead simple parser that finds all string literals while ignoring comments (except for template strings, see known issues below) and sets them to either single or double quotes

## Usage
```bash
$ node q2q.js [single|double] src.js out.js
```

## Examples
Original
```js
// Don't read these comments
//
// I'm going through too "much" effort for this lmao

const thing = "Hi, I\'m bobby, I \"like\" cats";
const inconsistent = 'So, I\'m fired eh?\n \"No. You\'re under arrest.\"';
const otherThing = `This template string has "things" to say, don't you think?`;

/*
  Stuff 'here' and "here" don't work man
 */
```
 Simple search & replace
```js
// Don"t read these comments
//
// I"m going through too "much" effort for this lmao

const thing = "Hi, I\"m bobby, I \"like\" cats";
const inconsistent = "So, I\"m fired eh?\n \"No. You\"re under arrest.\"";
const otherThing = `This template string has "things" to say, don"t you think?`;

/*
  Stuff "here" and "here" don"t work man
 */
```
 Q2Q
```js
// Don't read these comments
//
// I'm going through too "much" effort for this lmao

const thing = "Hi, I'm bobby, I \"like\" cats";
const inconsistent = "So, I'm fired eh?\n \"No. You're under arrest.\"";
const otherThing = `This template string has "things" to say, don't you think?`;

/*
  Stuff 'here' and "here" don't work man
 */
```

## Known issues
 * Assumes your code has no syntax errors
 * Will ignore strings in template literal interpolations, i.e. `"name"` stays as-is in the following snippet:
 ```js 
const greeting = `Hey, ${ user["name"] }!`;
```

## License
Apache License 2.0
