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
var launcher_dir = ''

config.config().then(res => {
    launcher_dir = res.dataDirectory
    if(!fs.existsSync(`${dataDirectory}/${res.dataDirectory}`))
    {
        fs.mkdirSync(`${dataDirectory}/${res.dataDirectory}`, { recursive: true })
        //create default language packages
        fs.mkdirSync(`${dataDirectory}/${res.dataDirectory}/language`, { recursive: true })
        fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/language/en.json`, JSON.stringify(en.DEFAULT_CONFIG, true, 4), 'UTF-8')
        fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/language/pt.json`, JSON.stringify(pt.DEFAULT_CONFIG, true, 4), 'UTF-8')
        fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/language/fr.json`, JSON.stringify(fr.DEFAULT_CONFIG, true, 4), 'UTF-8')
    }



    if(!fs.existsSync(`${dataDirectory}/${res.dataDirectory}/config.json`)){
        DEFAULT_CONFIG = {
            "Launcher": {
                "NewsAutoRefresh": false,
                "StatusServerAutoRefresh": false,
                "CloseLauncher": true,
                "Language":"en"
            },
            "Settings": {
                "Java": {
                    "RamMin": RamMin,
                    "RamMax": `${(totalMem / 3).toFixed(0)}`,
                    "Directory": null
                },
                "Resolution": {
                    "width": "1280",	
                    "height": "720"
                }
            },
            "Mode":0,
            "Login": {}
        }
  
        fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(DEFAULT_CONFIG, true, 4), 'UTF-8')

    }
    config.config_cache = require(`${dataDirectory}/${res.dataDirectory}/config.json`)

    import ("./settings/account.js")
    import ("./settings/java-directory.js")
    import ("./settings/resolution.js")
    import ("./settings/settings-launcher.js")
    document.addEventListener('change_panel', () => {
        document.querySelector(".accountsettings").innerHTML = language_service.Tradutor('settings.settings_account_menu_title', res.dataDirectory)
        document.querySelector(".ramsettings").innerHTML = language_service.Tradutor('settings.settings_ram_menu_title', res.dataDirectory)
        document.querySelector(".javasettings").innerHTML = language_service.Tradutor('settings.settings_java_menu_title', res.dataDirectory)
        //resolution
        document.querySelector(".resolutionsettings").innerHTML = language_service.Tradutor('settings.settings_resolution_menu.title', res.dataDirectory)
    // launcher settings
        document.querySelector(".launchersettings").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.title', res.dataDirectory)
        //save button
        document.querySelector(".settingsSave").innerHTML = language_service.Tradutor('settings.settings_save_menu_title', res.dataDirectory)

    })
  

})



document.querySelector(".accountsettings").addEventListener("click", () => {
    tab('accountsettingstab')
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
    document.querySelector(".text-settings").innerHTML = language_service.Tradutor('settings.settings_resolution_menu.description', launcher_dir)
})

document.querySelector(".launchersettings").addEventListener("click", () => {
    //sub launcher items

    tab('launchersettingstab')
    document.querySelector(".select-label-language").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.label_language_label', launcher_dir)
    document.querySelector(".checkbox-refresh-news").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.checkbox_news_refresh', launcher_dir)
    document.querySelector(".checkbox-refresh-server-status").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.checkbox_server_refresh', launcher_dir)
    document.querySelector(".checkbox-launcher-open").innerHTML = language_service.Tradutor('settings.settings_launcher_menu.checkbox_launcher_settings', launcher_dir)

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
