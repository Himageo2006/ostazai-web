const fs = require('fs');
const toAppend = fs.readFileSync('features_append.txt', 'utf8');
let code = fs.readFileSync('app.js', 'utf8');
code += toAppend;
fs.writeFileSync('app.js', code);
console.log('Appended', toAppend.length, 'chars. Total:', code.length);
