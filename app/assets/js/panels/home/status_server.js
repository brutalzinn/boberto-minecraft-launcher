const { config } = require('./assets/js/utils.js');
const { status } = require('minecraft-java-core');

config.info().then(async (config)  => {
    let StatusServer = await status.StatusServer(config.ip_server, parseInt(config.port_server))
    
    if(!StatusServer){
        document.querySelector(".player-connect-number").innerHTML = "O servidor está fechado no momento.";
        document.querySelector(".player-connect").innerHTML = "O servidor está fechado no momento.";
    } else {
        let status_json = StatusServer.raw.vanilla
        document.querySelector(".player-connect").innerHTML = ""
        if(status_json.raw.players.online === 0){
            // document.querySelector(".player-connect-number").innerHTML = `Nenhum jogador conectado`;
            document.querySelector(".player-connect").innerHTML = `Nenhum jogador conectado`;
        } else if (status_json.raw.players.online === 1){
            document.querySelector(".player-connect-number").innerHTML = `${status_json.raw.players.online} jogador conectado atualmente`;
            head(status_json)
        } else {
            document.querySelector(".player-connect-number").innerHTML = `${status_json.raw.players.online} jogadores atualmente logados`;
            head(status_json)
        }
    }
})


function head(status_json) {
    for (let i = 0; i < status_json.raw.players.sample.length; i++) { 
        let player = status_json.raw.players.sample[i].name
        document.querySelector(".player-connect").innerHTML += `<div><img class="users" src="https://mc-heads.net/head/${player}"><b class="users"> ${player}</b></div>`
    }
}


function StatusServerAutoRefresh() {
    config.config().then(config => {
        const config_var = require(`${dataDirectory}/${config.dataDirectory}/config.json`)
        if(config_var.Launcher.StatusServerAutoRefresh === true){
          setInterval(function(){
            status_var
          }, 600000)
        }
    })
}