const pkg = require("../../../../package.json");
const fetch = require("node-fetch")
if((pkg.user) === undefined || (pkg.user) === ""){
    var url = pkg.url
} else {
    var url = pkg.url + "/" + pkg.user
}
const config = url + "/launcher/config-launcher/config.json";
const info = url + "/launcher/config-launcher/info.json";
const news = url + "/launcher/news-launcher/news-launcher.json";
const modpacks = url + "/launcher/config-launcher/modpacks.json";
var settings_cache = null

module.exports.config_path = null
module.exports.launcherdir = null
module.exports.modpack_selected = {}
module.exports.modpack_cache = {}
module.exports.config_cache = {}



module.exports.readsettings = ReadSettings;

function ReadSettings(){
    
    if(settings_cache != null){
        return settings_cache
    }

    getData().then(res => {
        const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`)
        settings_cache = file
        return file
    })
}

module.exports.saveSettings = SaveSettings;

function SaveSettings(json){
    if(settings_cache != null){
         settings_cache = JSON.stringify(json, true, 4)
    }
    fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(json, true, 4), 'UTF-8')
}

module.exports.config = getData;

function getData() {
    return new Promise((resolve, reject) => {
        fetch(config).then(config => {
            return resolve(config.json());
        }).catch(error => {
            return reject(error);
        })
    })
}

module.exports.info = getInfo;
function getInfo() {
    return new Promise((resolve, reject) => {
        fetch(info).then(info => {
            return resolve(info.json());
        }).catch(error => {
            return reject(error);
        })
    })
}

module.exports.news = getNews;

function getNews() {
    return new Promise((resolve, reject) => {
        fetch(news, {cache: "no-cache"}).then(config => {
            return resolve(config.json());
        }).catch(error => {
            return reject(error);
        })
    })
}
module.exports.modpacks = getModPacks;

function getModPacks() {
    return new Promise((resolve, reject) => {
        fetch(modpacks, {cache: "no-cache"}).then(config => {
            return resolve(config.json());
        }).catch(error => {
            return reject(error);
        })
    })
}

module.exports.isonline = function isonline() {
    return new Promise((resolve, reject) => {
        getData().then(config => {
            return resolve(config.offline != "on")
        }).catch(error => {
            return reject(error);
        })
    })
}