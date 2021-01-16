let fs = require('fs');
let Stack = require("./stack");
class Persistence {
    constructor(dir=__dirname){
        this.dir = dir;
        this.store = "StackStore";
        this.ext = ".json";
    }
    pathfor(id){
        return this.dir+"/"+this.store+"/"+id.trim()+this.ext;
    }
    toTatva(stk) {
        let data = [];
        for (let v of stk.iterator) {
            let obj = {
                media_type: "",
                data: Buffer.from(JSON.stringify(v)).toString('base64'),
                md5: ""
            }
            data.push(obj);
        }
        console.log(this.pathfor(stk._uuid).toString());
        fs.writeFileSync(this.pathfor((stk._uuid).toString()),JSON.stringify(data));
    }
    fromTatva(id) {
        let data = JSON.parse(fs.readFileSync(this.pathfor(id)));
        let s = new Stack(parseInt(id));
        length = data.length;
        for (let i = 0; i < length; i++) {
            s.push(JSON.parse(Buffer.from(data.pop().data, 'base64').toString()));
        }
        return s;
    }
    getAll(){
        let files = fs.readdirSync(this.dir +"/"+this.store);
        return files.map((file) => { return file.replace(".json", ""); });
    }
    deleteTatva(id){
        fs.unlinkSync(this.pathfor(id));
        return id;
    }
}
module.exports = new Persistence();