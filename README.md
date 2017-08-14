# js-quote2quote
Converts all Javascript string literals (excluding template strings) to either single quote or double quote strings

It isn't a mere search & replace, it's basically a dead simple parser that finds all string literals while ignoring comments (except for template strings, see known issues below) and sets them to either single or double quotes

## Usage
```bash
$ node q2q.js [single|double] src.js out.js
```

## Known issues
 * Assumes your code has no syntax errors
 * Will ignore strings in template literal interpolations, i.e. `"name"` stays as-is in the following snippet:
 ```js 
const greeting = `Hey, ${ user["name"] }!`;
```

## License
Apache License 2.0
