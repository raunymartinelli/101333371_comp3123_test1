const fs = require('fs');
const path = require('path');

const logDirPath = path.join(__dirname, 'Logs');

// Creating Logs directory and files
if(!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath);
}

// Changing the current process to the Logs directory
process.chdir(logDirPath);

// Creating 10 log files
for(let i=0; i<10;i++){
    const fileName = `log${i}.txt`;
    fs.writeFileSync(fileName, `This is log file ${i}`);
    console.log(fileName);
}