const { config,en,pt,fr, language_service } = require('./assets/js/utils.js');
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const os = require("os")
let DEFAULT_CONFIG
const totalMem = Math.trunc(os.totalmem() / 1048576 * 10) / 10;
const freeMem = Math.trunc(os.freemem() / 1048576 * 10) / 10;

let RamMin
if ((freeMem / 3).toFixed(0)) {
    RamMin = "512"
} else {
    RamMin = `${(freeMem / 3).toFixed(0)}`
}


if(!fs.existsSync(`${dataDirectory}/${config.launcher_dir}`))
{
    fs.mkdirSync(`${dataDirectory}/${config.launcher_dir}`, { recursive: true })
}
if(!fs.existsSync(`${dataDirectory}/${config.launcher_dir}/language`))
{
    fs.mkdirSync(`${dataDirectory}/${config.launcher_dir}/language`, { recursive: true })
    fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/language/en.json`, JSON.stringify(en.DEFAULT_CONFIG, true, 4), 'UTF-8')
    fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/language/pt.json`, JSON.stringify(pt.DEFAULT_CONFIG, true, 4), 'UTF-8')
    fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/language/fr.json`, JSON.stringify(fr.DEFAULT_CONFIG, true, 4), 'UTF-8')
}



if(!fs.existsSync(`${dataDirectory}/${config.launcher_dir}/config.json`)){
    DEFAULT_CONFIG = {
        "Launcher": {
            "NewsAutoRefresh": false,
            "StatusServerAutoRefresh": false,
            "CloseLauncher": true,
            "Language":"en",
            "FavoriteModPack":null
        },
        "Settings": {
            "Java": {
                "RamMin": RamMin,
                "RamMax": `${(totalMem / 3).toFixed(0)}`,
                "Directory": null,
                "Args":""
            },
            "Resolution": {
                "width": "1280",	
                "height": "720"
            }
        },
        "Mode":0,
        "Login": {}
    }

    fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(DEFAULT_CONFIG, true, 4), 'UTF-8')
}

import ("./settings/account.js")
import ("./settings/java-directory.js")
import ("./settings/resolution.js")
import ("./settings/settings-launcher.js")
import ("./settings/java-args.js")
document.addEventListener('change_panel', () => {
    document.querySelector(".accountsettings").innerHTML = language_service.Tradutor('settings.settings_account_menu.title')
    document.querySelector(".noauth").innerHTML = language_service.Tradutor('settings.settings_account_menu.noauth_button_text')
    document.querySelector(".premium").innerHTML = language_service.Tradutor('settings.settings_account_menu.premium_button_text')
    document.querySelector(".ramsettings").innerHTML = language_service.Tradutor('settings.settings_ram_menu_title')
    document.querySelector(".javasettings").innerHTML = language_service.Tradutor('settings.settings_java_menu_title')
    document.querySelector(".resolutionsettings").innerHTML = language_service.Tradutor('settings.settings_resolution_menu.title')
    document.querySelector(".launchersettings").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.title')
    document.querySelector(".settingsSave").innerHTML = language_service.Tradutor('settings.settings_save_menu_title')
})
  





document.querySelector(".accountsettings").addEventListener("click", () => {
    tab('accountsettingstab')
    document.querySelector(".noauth").innerHTML = language_service.Tradutor('settings.settings_account_menu.noauth_button_text')
    document.querySelector(".premium").innerHTML = language_service.Tradutor('settings.settings_account_menu.premium_button_text')

})

document.querySelector(".ramsettings").addEventListener("click", () => {
    tab('ramsettinstab')
    import ("./settings/java-memory.js")
})

document.querySelector(".javasettings").addEventListener("click", () => {
    tab('javasettingstab')
})

document.querySelector(".resolutionsettings").addEventListener("click", () => {
    //sub resolution
    tab('resolutionsettingstab')
    document.querySelector(".text-settings").innerHTML = language_service.Tradutor('settings.settings_resolution_menu.description')
})

document.querySelector(".launchersettings").addEventListener("click", () => {
    //sub launcher items

    tab('launchersettingstab')
    document.querySelector(".select-label-modpackfavorite").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.label_favorite_modpack_label')
    document.querySelector(".select-label-language").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.label_language_label')
    document.querySelector(".checkbox-refresh-news").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.checkbox_news_refresh')
    document.querySelector(".checkbox-refresh-server-status").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.checkbox_server_refresh')
    document.querySelector(".checkbox-launcher-open").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.checkbox_launcher_settings')

})

function tab(info) {
    let content = document.getElementsByClassName("tabsettings");
    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    document.querySelector(`.${info}`).style.display = "block";
}

document.querySelector(".settingsSave").addEventListener("click", () => {
    tab('accountsettingstab')
    changePanel("settings", "home")
})
