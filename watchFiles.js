const chokidar = require('chokidar');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'src', 'assets');
const destDir = path.join(__dirname, 'src', 'public');

const adminSourceDir = path.join(__dirname, 'src', 'assets', 'admin');
const adminDestDir = path.join(__dirname, 'src', 'public', 'admin');

const publicJSPath = path.join(destDir, 'js');
const publicCSSPath = path.join(destDir, 'css');

const publicAdminJSPath = path.join(adminDestDir, 'js');
const publicAdminCSSPath = path.join(adminDestDir, 'css');

const copyFile = (srcPath) => {
  const relativePath = path.relative(sourceDir, srcPath);
  if (relativePath.startsWith('js')) buildJS();
  if (relativePath.startsWith('css')) buildCSS();
  if (relativePath.startsWith('admin/js')) buildAdminJS();
  if (relativePath.startsWith('admin/css')) buildAdminCSS();
};

const removeFile = (srcPath) => {
  const relativePath = path.relative(sourceDir, srcPath);
  const destPath = path.join(destDir, relativePath.replace('.ts', '.js'));
  fs.remove(destPath)
    .then(() => console.log(`Removed: ${destPath}`))
    .catch((err) => console.error(`Error removing ${destPath}:`, err));

  if (relativePath.startsWith('js')) buildJS();
  if (relativePath.startsWith('css')) buildCSS();
  if (relativePath.startsWith('admin/js')) buildAdminJS();
  if (relativePath.startsWith('admin/css')) buildAdminCSS();
};

const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const getTSFiles = (sourceDir) => {
  const jsPath = path.join(sourceDir, 'js')
  return fs.readdirSync(jsPath)
    .filter(file => file.endsWith('.ts'))
    .map(file => path.join(jsPath, file))
    .join(' ');
};

const buildJS = () => {
  ensureDirExists(publicJSPath);
  const tsFiles = getTSFiles(sourceDir);
  if (!tsFiles) {
    console.log('No TypeScript files found, skipping JS build.');
    return;
  }
  exec(`esbuild ${sourceDir}/js/*ts --bundle --outdir=${destDir}/js`, (err, stdout, stderr) => {
    if (err) console.error(`Error rebuilding JS: ${stderr}`);
    // else console.log('JavaScript updated successfully.');
  });
};

const buildAdminJS = () => {
  ensureDirExists(publicAdminJSPath);
  const tsFiles = getTSFiles(adminSourceDir);
  if (!tsFiles) {
    console.log('No TypeScript files found, skipping JS build.');
    return;
  }
  exec(`esbuild ${adminSourceDir}/js/*ts --bundle --outdir=${adminDestDir}/js`, (err, stdout, stderr) => {
    if (err) console.error(`Error rebuilding JS: ${stderr}`);
    // else console.log('JavaScript updated successfully.');
  });
};

const buildCSS = () => {
  ensureDirExists(publicCSSPath);
  exec(`postcss ${sourceDir}/css/*.css --dir ${destDir}/css`, (err, stdout, stderr) => {
    if (err) console.error(`Error rebuilding CSS: ${stderr}`);
    // else console.log('CSS updated successfully.');
  });
};

const buildAdminCSS = () => {
  ensureDirExists(publicAdminCSSPath);
  exec(`postcss ${adminSourceDir}/css/*.css --dir ${adminDestDir}/css`, (err, stdout, stderr) => {
    if (err) console.error(`Error rebuilding CSS: ${stderr}`);
    // else console.log('CSS updated successfully.');
  });
};

const watcher = chokidar.watch([sourceDir, adminSourceDir], {
  persistent: true,
  ignoreInitial: false,
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 10,
  },
});

watcher
  .on('add', copyFile)
  .on('change', copyFile)
  .on('unlink', removeFile)
  .on('error', (error) => console.error(`Watcher error: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes.'));