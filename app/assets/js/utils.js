const fs = require("fs");
const path = require('path');
const util = require('util');
const crypto = require('crypto');

module.exports = {
    config: require("./utils/config.js"),
    auth: require("./utils/auth.js"),
    Slider: require("./utils/slider.js"),
     en: require('./language/en.js'),
     pt: require('./language/pt.js'),
     fr: require('./language/fr.js'),
     tradutor: require('./utils/language')
}


async function checkSHA1(file, hash){
     const hex = crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex')
     console.log(hex)
     if(hex == hash) return true;
     return false;
 }
 module.exports.sleep = sleep

 function sleep(ms){
     return new Promise((r) => { setTimeout(r, ms) });
   }


module.exports.checkmodsfolder = async function (url,modpack_dir){
     let data = await fetch(url).then(res => res.json());
     var mods_server = []
     var mods_delete = []
     data.forEach(url => {
         if(url.type == "MOD")
         mods_server.push({
             sha1: url.sha1,
             size: url.size,
             path: url.path,
             type: url.type,
             url: url.url
         })
     });
         const readdir = util.promisify(fs.readdir);
         let mods_dirs = await readdir(`${modpack_dir}/mods`)
         for (let filename of mods_dirs) {
             let mod_path = `mods/${filename}`
             let mod =  mods_server.find(v=> v.path == mod_path)
            if(mod == undefined || mod != undefined && !await checkSHA1(path.resolve(`${modpack_dir}/${mod.path}`).replace(/\\/g, "/"),mod.sha1)){
             mods_delete.push(path.resolve(`${modpack_dir}/mods/${filename}`).replace(/\\/g, "/"))          
             }
         }
        
     if(mods_delete.length > 0){
         mods_delete.forEach(filename => {
        if(fs.existsSync(filename) && fs.lstatSync(filename).isDirectory()){
          fs.rmdirSync(filename, { recursive: true, force: true })
        }else if(fs.existsSync(filename) && fs.lstatSync(filename).isFile())
         fs.unlinkSync(filename);
         })
     }
 }

module.exports.compare = compare
function compare(v1, v2) {
    if (v1===v2)
      return 1;
    const nbs1 = v1.split(".");
    const nbs2 = v2.split(".");
    const nbElem = Math.max(nbs1.length, nbs1.length)
    for(i=0;i<nbElem ;++i) {
        if(nbs2[i] === undefined)
             return 1;
        if(nbs1[i] === undefined)
             return -1;
        let nb1 = parseInt(nbs1[i]);
        let nb2 = parseInt(nbs2[i]);
        if(nb1 > nb2)
             return 1;
        if(nb1 < nb2)
             return -1;
    }
    if(nbs2.length > nbs1.length)
         return -1;
    return 0;
  }

  /**
* Classe slider : permet de créer un slider à deux valeurs (utile pour créer des bornes)
* @author LoganTann, Luuxis

*/
