#! /usr/bin/env node

const fs   = require("fs");
const args = process.argv;

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

/*
  
  This is Quote-to-Quote's source,
  this is a comment to show it ignores comments
  
 */

function switchStringLiterals(rawSource, rawPreference) {
  const source = rawSource;
  const prefer = rawPreference === "'" || rawPreference === '"' ? rawPreference : '"';
  const other  = opposite(prefer);
  let newSource = "";

  // Comment mappings
  const commentEndings = {
    "//":   "\n",
    "/*":   "*/",
    "<!--": "\n",
    "-->":  "\n"
  };

  const commentCharMap = {
    // Mappings
  };

  const comments = Object.keys(commentEndings);

  for (let i=0; i<comments.length; i++) {
    const comment = comments[i];
    
    (commentCharMap[comment[0]] || (commentCharMap[comment[0]] = [])).push(comment);
  }

  // "Parser" state
  let inComment    = false;
  let commentType  = null;
  let commentClose = null;
  let inTemplate   = false;
  let inString     = false;
  let stringSwitch = false;
  let stringType   = "'";
  let stringType2  = '"';

  // Now iterate over source char-by-char
  mainLoop:
  for (let i=0; i<source.length; i++) {
    const char = source[i];
    
    if (inComment) {
      if (char === commentClose[0]) {
        // Check if it's the end of the comment
        if (source.substr(i, commentClose.length) === commentClose) {
          // It's the end of the comment
          newSource += commentClose;
          inComment  = false;
          
          i += commentClose.length - 1;
          continue;
        }
      }
      
      // Just add comment's contents
      newSource += char;
    } else if (inTemplate) {
      if (char === "\\" && source[i + 1] === "`") {
        // Escaped tilde, skip it
        newSource += "\\`";
        
        i++;
      } else {
        if (char === "`") {
          inTemplate = false;
        }
        
        newSource += char;
      }
    } else if (inString) {
      if (char === "\\") {
        if (source[i + 1] === other) {
          newSource += char;
        } else {
          newSource += "\\" + char;
        }
        
        // Skip escape char
        i++;
      } else {
        if (char === stringType) {
          // We're at the end of the string
          inString = false;
          newSource += prefer;
        } else if (stringSwitch && char === stringType2) {
          // We need to escape the other quote because of a switch
          newSource += "\\" + stringType2;
        } else {
          // Nothing special, just append the char
          newSource += char;
        }
      }
    } else {
      // Check if the start of a comment
      let mapComments;
      
      if (mapComments = commentCharMap[char]) {
        commentLoop:
        for (let j=0; j<mapComments.length; j++) {
          const commentStart = mapComments[j];
          
          if (source.substr(i, commentStart.length) === commentStart) {
            inComment    = true;
            commentType  = commentStart;
            commentClose = commentEndings[commentStart];
            
            // Add comment to newSource
            newSource += commentStart;
            
            i += commentStart.length - 1;
            
            // Go to next iteration
            continue mainLoop;
          }
        }
      }
      
      switch (char) {
        case '"':
        case "'":
          stringType  = char;
          stringType2 = opposite(char);
          
          // Will this string's quotes be switched?
          if (stringType === prefer) {
            stringSwitch = false;
          } else {
            stringSwitch = true;
          }
          
          newSource += prefer;
          inString   = true;
          break;
        case "`":
          inTemplate = true;
          newSource += "`";
          break;
        default:
          newSource += char;
      }
    }
  }

  return newSource;
}

function opposite(quote) {
  if (quote === '"') {
    return "'";
  } else {
    return '"';
  }
}
