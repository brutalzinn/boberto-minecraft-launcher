const {launch} = require('minecraft-java-core');
const fs = require('fs');
const crypto = require('crypto');
const launcher = new launch();
const msmc = require("msmc-luuxis");
const pkg = require('../package.json');
const win = nw.Window.get();
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const { auth, config } = require('./assets/js/utils.js');
const path = require('path');
const util = require('util');


async function checkSHA1(file, hash){
    const hex = crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex')
    console.log(hex)
    if(hex == hash) return true;
    return false;
}
//this is wrong way. this type function is generic. Needs be in separeted folder immediatily.
function sleep(ms){
    return new Promise((r) => { setTimeout(r, ms) });
  }
async function checkModsFolder(url,modpack_dir){
  
    document.querySelector(".info-download").innerHTML = 'Confirmando mods..'
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
        document.querySelector(".info-download").innerHTML = 'Mods incompatíveis com o modpack detectados. <br/> Iniciando remoção.'
        await sleep(1000)
        mods_delete.forEach(filename => {
        fs.unlinkSync(filename);
        })
    }
    document.querySelector(".info-download").innerHTML = 'Todos os mods foram checados.'
}

document.querySelector(".play-btn").addEventListener("click", async () => {
    var modpack = config.modpack_selected
    

    document.querySelector(".play-btn").style.display = "none"
    document.querySelector(".info-download").style.display = "block"
    config.config().then(config => {
    let modpack_dir = `${dataDirectory}/${config.dataDirectory}/${modpack.directory}`
    if (document.getElementById('force-play').checked) {
        document.querySelector(".info-download").innerHTML = `Forçando atualização..`
        try {
            fs.rmdirSync(modpack_dir, { recursive: true });
            document.querySelector(".info-download").innerHTML = `Iniciando atualização em modo forçado..`

        } catch (err) {
            document.querySelector(".info-download").innerHTML = `Ocorreu um erro ao forçar a atualização.`
        }
        document.querySelector(".info-download").style.display = "block"
    }
        const config_launcher = require(dataDirectory + "/" + config.dataDirectory + "/config.json")

        if(config.game_url === "" || config.game_url === undefined || config.game_url === null) {
            var url = `${pkg.url}/files?modpack=${modpack.id}`
        } else {
            var url = config.game_url
        }

        if(auth.user == undefined){
            if(config_launcher.Login.UserConnect == "Microsoft"){
                var authenticator = msmc.getMCLC().getAuth(config_launcher.Login.Account.Microsoft.User)
            } else if(config_launcher.Login.UserConnect == "Mojang"){
                var authenticator = config_launcher.Login.Account.Mojang.User
            } else if(config_launcher.Login.UserConnect == "Crack") {
                var authenticator = config_launcher.Login.Account.Crack.User 
            }
        } else {
            var authenticator = auth.user
        }
       
        let opts = {
            url: url,
            authorization: authenticator,
            path: modpack_dir,
            version: modpack.game_version,
            detached: true,
            java: config.java,
            custom: config.custom,
            verify: config.verify,
            ignored: config.ignored,
            memory: {
                min: `${config_launcher.Settings.Java.RamMin}M`,
                max: `${config_launcher.Settings.Java.RamMax}M`
            }
        }
        checkModsFolder(opts.url,opts.path).then(()=>launcher.launch(opts))
        
        
        launcher.on('progress', (DL, totDL) => {
            document.querySelector(".progress-bar").style.display = "block"
            document.querySelector(".info-download").innerHTML = `Download ${((DL / totDL) * 100).toFixed(0)}%`
            document.querySelector(".progress-bar").value = DL;
            document.querySelector(".progress-bar").max = totDL;
        });
        
        launcher.on('speed', (speed) => {
            console.log(`${(speed / 1067008).toFixed(2)} Mb/s`)
        })

        launcher.on('check', (e) => {
            document.querySelector(".info-download").innerHTML = `Verificação`
        })
        
        launcher.on('data', (e) => {
            console.log(e)
            if(config_launcher.Launcher.CloseLauncher === true){
                win.hide();
            }
            document.querySelector(".info-download").innerHTML = `Iniciando o jogo atual`
        })
        
        launcher.on('close', (e) => {
            if(config_launcher.Launcher.CloseLauncher === true){
                win.show();
                win.focus();
                win.setShowInTaskbar(true);
            }
            document.querySelector(".progress-bar").style.display = "none"
            document.querySelector(".info-download").style.display = "none"
            document.querySelector(".info-download").innerHTML = `Verificação`
            document.querySelector(".play-btn").style.display = "block"
        })
    })
})