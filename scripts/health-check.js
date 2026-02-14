#!/usr/bin/env node
/**
 * Health Check Script
 * Verifica que todo está configurado correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('\n╔════════════════════════════════════════╗');
console.log('║  🏥 MissTNA Web - Health Check       ║');
console.log('╚════════════════════════════════════════╝\n');

const checks = {
    'Node.js environment': () => process.version,
    'npm installed': () => require('child_process').execSync('npm --version', { encoding: 'utf-8' }).trim(),
    'package.json': () => fs.existsSync('package.json') ? '✓' : '✗',
    'tsconfig.json': () => fs.existsSync('tsconfig.json') ? '✓' : '✗',
    'next.config.js': () => fs.existsSync('next.config.js') ? '✓' : '✗',
    'src/ directory': () => fs.existsSync('src') ? '✓' : '✗',
    'src/app/ directory': () => fs.existsSync('src/app') ? '✓' : '✗',
    'prisma/ directory': () => fs.existsSync('prisma') ? '✓' : '✗',
    '.env.local exists': () => fs.existsSync('.env.local') ? '✓ (configured)' : '⚠ (not configured)',
    'node_modules': () => fs.existsSync('node_modules') ? '✓' : '✗ (run: npm install)',
};

let allGood = true;
for (const [check, fn] of Object.entries(checks)) {
    try {
        const result = fn();
        const status = result === '✗' ? '❌' : '✅';
        console.log(`${status} ${check}: ${result}`);
        if (result === '✗') allGood = false;
    } catch (error) {
        console.log(`❌ ${check}: ERROR - ${error.message}`);
        allGood = false;
    }
}

console.log('\n');

if (allGood) {
    console.log('✅ Proyecto configurado correctamente!');
    console.log('\n  Próximo paso: npm run dev\n');
} else {
    console.log('⚠️  Hay problemas en la configuración');
    console.log('\n  Ejecuta: npm install\n');
    process.exit(1);
}
