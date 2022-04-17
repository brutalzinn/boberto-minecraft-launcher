const pkg = require("../../../../package.json");
const fetch = require("node-fetch")
const fs = require("fs");

if((pkg.user) === undefined || (pkg.user) === ""){
    var url = pkg.url
} else {
    var url = pkg.url + "/" + pkg.user
}
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const launcher_dir = pkg.directory
const config = url + "/cliente/launcher/config-launcher/config.json";
const info = url + "/cliente/launcher/config-launcher/info.json";
const news = url + "/cliente/launcher/news-launcher/news-launcher.json";
const modpacks = url + "/cliente/launcher/config-launcher/modpacks.json";

module.exports.launcher_dir = launcher_dir
module.exports.config_path = null
module.exports.modpack_selected = {}
module.exports.modpack_cache = {}
module.exports.config_cache = {}

module.exports.ExistConfigFile  = function exitconfigfile(){
   return fs.existsSync(`${dataDirectory}/${launcher_dir}/config.json`)
}

module.exports.ReadConfig  = function readsettings(){
        const file = require(`${dataDirectory}/${launcher_dir}/config.json`)
        return file
}

module.exports.SaveSettings = function savesettings(json){
    fs.writeFileSync(`${dataDirectory}/${launcher_dir}/config.json`, JSON.stringify(json, true, 4), 'UTF-8')
    return true
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