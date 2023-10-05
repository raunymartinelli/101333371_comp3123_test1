const fs = require('fs');
const path = require('path');

const logDirPath = path.join(__dirname, 'Logs');

// Removing files and Logs directory
if(fs.existsSync(logDirPath)){
    const files = fs.readdirSync(logDirPath);
    files.forEach(file=>{
        console.log('delete files...' + file);
        fs.unlinkSync(path.join(logDirPath, file));
    });
    fs.rmdirSync(logDirPath);
}else{
    console.log('Logs directory does not exist.');
}