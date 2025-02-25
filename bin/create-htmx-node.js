#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const targetDir = process.argv[2] || 'my-new-app';
const templateDir = path.join(__dirname, '..');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
  execSync(`cp -r ${templateDir}/* ${targetDir}`);
  console.log(`Project created in: ${targetDir}`);
} else {
  console.error('Directory already exists!');
}

console.log('Running setup...');
execSync(`cd ${targetDir} && npm install`);
console.log('Setup complete.');