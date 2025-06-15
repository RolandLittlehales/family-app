#!/usr/bin/env node
/**
 * Family App Setup Validation Script
 * Validates development environment and dependencies
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function warning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function error(message) {
  log(`❌ ${message}`, colors.red);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function header(message) {
  log(`\n${colors.bright}${colors.cyan}${message}${colors.reset}`);
}

function getVersion(command) {
  try {
    const output = execSync(command, { encoding: 'utf8', stderr: 'ignore' });
    return output.trim();
  } catch (e) {
    return null;
  }
}

function checkNodeVersion() {
  const nodeVersion = getVersion('node --version');
  if (!nodeVersion) {
    error('Node.js is not installed');
    return false;
  }

  const majorVersion = parseInt(nodeVersion.replace('v', '').split('.')[0]);
  if (majorVersion < 18) {
    error(`Node.js ${nodeVersion} is installed, but version 18+ is required`);
    return false;
  }

  success(`Node.js ${nodeVersion} is installed`);
  return true;
}

function checkNpmVersion() {
  const npmVersion = getVersion('npm --version');
  if (!npmVersion) {
    error('npm is not installed');
    return false;
  }

  success(`npm ${npmVersion} is installed`);
  return true;
}

function checkProjectFiles() {
  const requiredFiles = [
    'package.json',
    'next.config.ts',
    'tsconfig.json',
    'src/app/layout.tsx',
    'src/app/page.tsx',
    '.env.example'
  ];

  let allFilesExist = true;
  
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      success(`${file} exists`);
    } else {
      error(`${file} is missing`);
      allFilesExist = false;
    }
  }

  return allFilesExist;
}

function checkNodeModules() {
  if (!fs.existsSync('node_modules')) {
    warning('node_modules directory not found - run "npm install"');
    return false;
  }

  if (!fs.existsSync('package-lock.json')) {
    warning('package-lock.json not found - dependencies may not be locked');
    return false;
  }

  success('node_modules and package-lock.json are present');
  return true;
}

function checkScripts() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = [
      'dev',
      'build',
      'start',
      'lint',
      'type-check',
      'quality'
    ];

    let allScriptsExist = true;
    
    for (const script of requiredScripts) {
      if (packageJson.scripts && packageJson.scripts[script]) {
        success(`Script "${script}" is configured`);
      } else {
        error(`Script "${script}" is missing from package.json`);
        allScriptsExist = false;
      }
    }

    return allScriptsExist;
  } catch (e) {
    error('Could not read package.json');
    return false;
  }
}

function checkEnvironment() {
  if (fs.existsSync('.env.local')) {
    info('.env.local file exists');
  } else {
    info('.env.local not found (this is optional for current setup)');
  }

  if (fs.existsSync('.env.example')) {
    success('.env.example template exists');
  } else {
    warning('.env.example template is missing');
  }

  return true;
}

function runBuildTest() {
  try {
    info('Running build test...');
    execSync('npm run build', { stdio: 'ignore' });
    success('Build test passed');
    return true;
  } catch (e) {
    error('Build test failed - check for TypeScript errors or missing dependencies');
    return false;
  }
}

function runLintTest() {
  try {
    info('Running lint test...');
    execSync('npm run lint:check', { stdio: 'ignore' });
    success('Lint test passed');
    return true;
  } catch (e) {
    warning('Lint test failed - run "npm run lint:fix" to auto-fix issues');
    return false;
  }
}

function runTypeCheck() {
  try {
    info('Running TypeScript check...');
    execSync('npm run type-check', { stdio: 'ignore' });
    success('TypeScript check passed');
    return true;
  } catch (e) {
    error('TypeScript check failed - fix type errors before continuing');
    return false;
  }
}

function checkDevServer() {
  // We can't actually start the dev server in this script,
  // but we can check if the dev script exists and dependencies are ready
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts && packageJson.scripts.dev) {
      success('Dev server script is configured');
      info('Run "npm run dev" to start the development server');
      return true;
    } else {
      error('Dev server script is missing');
      return false;
    }
  } catch (e) {
    error('Could not verify dev server configuration');
    return false;
  }
}

function showSummary(results) {
  header('Setup Validation Summary');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  if (passed === total) {
    success(`All ${total} checks passed! Your development environment is ready.`);
    info('\nNext steps:');
    info('1. Run "npm run dev" to start the development server');
    info('2. Open http://localhost:3000 in your browser');
    info('3. Check the README.md for detailed development workflow');
  } else {
    warning(`${passed}/${total} checks passed. Please address the issues above.`);
    info('\nFor help troubleshooting:');
    info('1. Check the Troubleshooting section in README.md');
    info('2. Review DEVELOPMENT_LEARNINGS.md for detailed setup insights');
    info('3. Ensure all dependencies are installed with "npm install"');
  }
}

// Main execution
async function main() {
  header('🚀 Family App Setup Validation');
  
  const results = [
    { name: 'Node.js Version', passed: checkNodeVersion() },
    { name: 'npm Version', passed: checkNpmVersion() },
    { name: 'Project Files', passed: checkProjectFiles() },
    { name: 'Dependencies', passed: checkNodeModules() },
    { name: 'Package Scripts', passed: checkScripts() },
    { name: 'Environment Config', passed: checkEnvironment() },
    { name: 'TypeScript Check', passed: runTypeCheck() },
    { name: 'Lint Check', passed: runLintTest() },
    { name: 'Build Test', passed: runBuildTest() },
    { name: 'Dev Server Config', passed: checkDevServer() }
  ];

  showSummary(results);
  
  // Exit with error code if any checks failed
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}

// Run the validation
main().catch(console.error);