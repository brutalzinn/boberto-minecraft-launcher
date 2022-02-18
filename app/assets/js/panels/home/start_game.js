const {launch} = require('minecraft-java-core');
const launcher = new launch();
const fs = require('fs');
const pkg = require('../package.json');
const win = nw.Window.get();
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const { auth, config, checkmodsfolder,language_service } = require('./assets/js/utils.js');
win.on('loaded', () => { loadTranslation() });
document.addEventListener('change_panel', () => loadTranslation())

function loadTranslation(){
   console.log('loading translators... home')
    document.querySelector(".play-btn").innerHTML = language_service.Tradutor('play_button_text')
    document.querySelector(".force-update").innerHTML = language_service.Tradutor('force_update_checkbox_text')
    document.querySelector(".player-connect-head-text").innerHTML = language_service.Tradutor('server_list.server_list_status_title_text')
    document.querySelector(".news-text").innerHTML = language_service.Tradutor('news.news_title_text')
    document.querySelector(".news-next").innerHTML = language_service.Tradutor('news.news_next_button_text')
    document.querySelector(".news-before").innerHTML = language_service.Tradutor('news.news_back_button_text')
    document.querySelector(".modpack_label").innerHTML = language_service.Tradutor('modpack.modpack_title_text')
    console.log('loaded translator home')

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
        console.log("url",url)

        if(!auth.user){
            var authenticator = config_launcher.Login[config_launcher.select]       
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
            custom: modpack.forge_version !== "" || modpack.fabric_version !== "",
            verify: config.verify,
            ignored: config.ignored,
            memory: {
                min: `${config_launcher.Settings.Java.RamMin}M`,
                max: `${config_launcher.Settings.Java.RamMax}M`
            }
        }
        
        if(modpack.verify_mods){
            console.log("verificando mods")
            document.querySelector(".info-download").innerHTML = 'Confirmando mods..'
             checkmodsfolder(opts.url, opts.path).then(()=>{
                document.querySelector(".info-download").innerHTML = 'Todos os mods foram checados. </br> Iniciando modpack..'
                launcher.launch(opts)
            })
        }else{
            launcher.launch(opts)
        }
        
        
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