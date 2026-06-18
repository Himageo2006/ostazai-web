const fs = require('fs');

// Read append content from a separate file to avoid template literal conflicts
const toAppend = fs.readFileSync('stats_append.txt', 'utf8');
let code = fs.readFileSync('app.js', 'utf8');
code += toAppend;
fs.writeFileSync('app.js', code);
console.log('Done — appended', toAppend.length, 'chars to app.js');
console.log('New app.js size:', code.length, 'chars');
