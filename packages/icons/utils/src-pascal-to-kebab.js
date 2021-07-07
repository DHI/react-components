const fs = require('fs');
const path = require('path');
const glob = require('glob');

const srcDir = path.join(__dirname, '../src/');
const svgFiles = glob.sync(path.join(srcDir, '/**.svg'));

for (const svgFile of svgFiles) {
  const newName = path
    .parse(svgFile)
    .name.replace(/([a-z])([A-Z])/g, '$1-$2')
    .split('-')
    .map((substr) => substr.charAt(0).toLowerCase() + substr.slice(1))
    .join('-');

  fs.rename(svgFile, path.join(srcDir, newName + '.svg'), (err) => {
    if (err) throw Error(err);
    console.log(`${svgFile} -> ${newName}.svg`);
  });
}
