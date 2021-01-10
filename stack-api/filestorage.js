const fs = require('fs');
const path = require('path')
const baseStorageFolder = 'data';

module.exports.synchronize = function (stackJson, stackId) { 
    var json = JSON.stringify(stackJson);
    console.log('persist stack with id '+stackId+' to file. data : '+json);
    fs.writeFileSync(baseStorageFolder+path.sep+stackId+'.json',json);
}

module.exports.load = function (stackId) { 
    if (fs.existsSync(baseStorageFolder+path.sep+stackId+'.json')) {
        let rawdata = fs.readFileSync(baseStorageFolder+path.sep+stackId+'.json', 'utf8');
        let obj = JSON.parse(rawdata);
        return obj;
    }else{
        let obj = [];
        return obj;
    }    
}

