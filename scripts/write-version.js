const fs = require('fs');
const packageJson = require('../package.json');

const envVars = `NEXT_PUBLIC_VERSION=${packageJson.version}\n`;

fs.appendFileSync('.env', envVars);
