// Written in JS for now
const svgr = require('@svgr/core').default;
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { exec } = require('child_process');

const distDir = './dist/';
const srcDir = './src/';

const iconSize = 40;
const iconColor = '#0B4566';

const template = ({ template }, opts, { imports, componentName, jsx }) =>
  template.smart({ plugins: ['typescript'] }).ast`
        ${imports}
        ${'\n'}
        const ${componentName} = (props?: React.SVGProps<SVGSVGElement>): React.ReactElement<SVGElement> => ${jsx};
        export default ${componentName};
    `;

if (fs.existsSync(distDir)) fs.rmdirSync(distDir, { recursive: true });
fs.mkdirSync(distDir);

const svgFiles = glob.sync(path.join(srcDir, '/**.svg'));

// Generate TSX components with template
console.log('🔧 Generating...');
for (const svgFile of svgFiles) {
  const svg = fs.readFileSync(svgFile, 'utf-8');
  const componentName = path
    .parse(svgFile)
    .name.split('-')
    .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
    .join('');

  const componentCode = svgr.sync(
    svg,
    {
      template,
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      svgoConfig: {
        plugins: [
          { convertColors: { currentColor: true } },
          { removeXMLNS: { active: true } },
        ],
      },
      svgProps: {
        height: iconSize,
        width: iconSize,
        color: iconColor,
        viewBox: `0 0 ${iconSize} ${iconSize}`,
      },
    },
    { componentName }
  );
  const filePath = path.join(distDir, `${componentName}.tsx`);
  fs.writeFileSync(filePath, componentCode);

  fs.appendFileSync(
    path.join(distDir, 'index.ts'),
    `export { default as ${componentName} } from './${componentName}';\n`
  );

  console.log(`${svgFile} -> ${filePath}`);
}

// Copy package.json, remove unnecessary fields
const packageJSON = fs.readFileSync('package.json');
const package = JSON.parse(packageJSON);
delete package.devDependencies;
delete package.scripts;

const distPackagePath = path.join(distDir, 'package.json');

fs.writeFile(distPackagePath, JSON.stringify(package), () =>
  console.log(`✅ Added ${distPackagePath}`)
);

// Compile TS for dist
console.log('🔧 Compiling...');
exec(`tsc`, () => {
  const tsxFiles = glob.sync(path.join(distDir, '/**.tsx'));

  for (const tsxFile of tsxFiles) {
    console.log(
      `${tsxFile} -> ${tsxFile.replace('tsx', 'js')} & ${tsxFile.replace(
        'tsx',
        'd.ts'
      )}`
    );
    fs.unlink(tsxFile, (err) => {
      if (err) throw Error(err);
    });
  }

  const indexTsPath = path.join(distDir, 'index.ts');
  fs.unlink(indexTsPath, (err) => {
    if (err) throw Error(err);
    console.log(`Removed ${indexTsPath}`);
  });
});
