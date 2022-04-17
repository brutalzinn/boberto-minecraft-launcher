const { config } = require('./assets/js/utils.js');

const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const glob = require('glob')
const path = require('path');




config.config().then(res => {

const file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);

let languageSelector = document.querySelector(".select-language")

document.querySelector(".select-language").addEventListener('change', async function() {
file.Launcher.Language = this.value
fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
});




    const languages = `${dataDirectory}/${config.launcher_dir}/language`

    var files = glob.sync(`${languages}/*.json`);

    files = files.map((item)=> path.basename(item))

    if(files.length === 0)
    {
        languageSelector.innerHTML += `<option value="-1">No any languages are found</option>`
    }
    else
    {
        for(var i = 0; i < files.length; i++)
        {
            var lang = require(`${languages}/${files[i]}`)
            languageSelector.innerHTML += `<option value="${files[i].split('.')[0]}">${lang.name}</option>`
        }
    }
    
    languageSelector.value = file.Launcher.Language

    if (file.Launcher.NewsAutoRefresh === true) {
        document.querySelector(".NewsAutoRefreshSettings").checked = true
    } else if (file.Launcher.NewsAutoRefresh === false) {
        document.querySelector(".NewsAutoRefreshSettings").checked = false
    }

    
    if (file.Launcher.StatusServerAutoRefresh === true) {
        document.querySelector(".StatusServerAutoRefreshSettings").checked = true
    } else if (file.Launcher.StatusServerAutoRefresh === false) {
        document.querySelector(".StatusServerAutoRefreshSettings").checked = false
    }

    
    if (file.Launcher.CloseLauncher === false) {
        document.querySelector(".CloseLauncherSettings").checked = true
    } else if (file.Launcher.CloseLauncher === true) {
        document.querySelector(".CloseLauncherSettings").checked = false
    }

    config.modpacks().then( async modpack => {
        let modPackSelector = document.querySelector(".select-modpackfavorite")
        if(modpack.length === 0)
        {
            modPackSelector.innerHTML += `<option value="-1">Nenhum modpack disponível</option>`
            return
        }
    
        var file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
    
        modPackSelector.innerHTML += `<option value="">Sem favorito</option>`
        for (let i = 0; i < modpack.length; i++) 
        {
            modPackSelector.innerHTML += `<option value="${modpack[i].id}">${modpack[i].name}</option>`
        }
        if(file.Launcher.FavoriteModPack !== null){
            modPackSelector.value = file.Launcher.FavoriteModPack
        }
        modPackSelector.addEventListener('change', function() {
       
            file.Launcher.FavoriteModPack = this.value === "" ? null : this.value 
            fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        })
  
        
    
    })
})




document.querySelector(".NewsAutoRefreshSettings").addEventListener("click", () => {
    config.config().then(res => {
        var file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
        if(document.querySelector(".NewsAutoRefreshSettings").checked == true){
            file.Launcher.NewsAutoRefresh = true
            fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        } else if(document.querySelector(".NewsAutoRefreshSettings").checked ==  false){
            file.Launcher.NewsAutoRefresh = false
            fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        }
    })
})

document.querySelector(".StatusServerAutoRefreshSettings").addEventListener("click", () => {
    config.config().then(res => {
        var file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
        if(document.querySelector(".StatusServerAutoRefreshSettings").checked == true){
            file.Launcher.StatusServerAutoRefresh = true
            fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        } else if(document.querySelector(".StatusServerAutoRefreshSettings").checked ==  false){
            file.Launcher.StatusServerAutoRefresh = false
            fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        }
    })
})

document.querySelector(".CloseLauncherSettings").addEventListener("click", () => {
    config.config().then(res => {
        var file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
        if(document.querySelector(".CloseLauncherSettings").checked == true){
            file.Launcher.CloseLauncher = false
            fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        } else if(document.querySelector(".CloseLauncherSettings").checked ==  false){
            file.Launcher.CloseLauncher = true
            fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        }
    })
})