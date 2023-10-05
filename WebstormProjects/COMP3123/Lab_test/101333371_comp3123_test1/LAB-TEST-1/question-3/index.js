-1
// Rauny Ferreira Martinelli
// Student ID: 101333371

const childProcess= require('child_process');

console.log('--- Creating Log Files ---');
childProcess.execSync('node add.js', {stdio: [0,1,2]});

console.log('\n--- Removing Log Files ---');
childProcess.execSync('node remove.js',{stdio: [0,1,2]} );