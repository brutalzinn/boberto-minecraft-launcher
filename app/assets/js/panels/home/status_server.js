const { config, language_service } = require('./assets/js/utils.js');
const { status } = require('minecraft-java-core');

config.modpacks().then( async modpack => {
    if(modpack.length === 0)
    {
        document.querySelector(".player-connect").innerHTML = `Nenhum modpack disponível`
    } 
     else 
    {
    for (let i = 0; i < modpack.length; i++) 
    {
        let StatusServer = await status.StatusServer(modpack[i].server_ip, parseInt( modpack[i].server_port))
        let modpackName = modpack[i].name
        if(!StatusServer){
            document.querySelector(".player-connect").innerHTML += language_service.TradutorVars('server_list.status_server_offline_title', [modpackName]);
            console.log("TESTEEEE",language_service.TradutorVars('server_list.status_server_offline_title', [modpackName]))

        }
        
        else
        {
            if(StatusServer.players.online === 0){
                // document.querySelector(".player-connect").innerHTML = `Nenhum jogador conectado`;
                document.querySelector(".player-connect").innerHTML += language_service.TradutorVars("server_list.status_server_empty_title", [modpackName]);
            } else if (StatusServer.players.online === 1){
                document.querySelector(".player-connect").innerHTML += language_service.TradutorVars("server_list.status_server_one_player_connected_title",[StatusServer.players.online, modpackName]);
                head(StatusServer.players)      
            } else {
                document.querySelector(".player-connect").innerHTML += language_service.TradutorVars("server_list.status_server_multiple_player_connected_title",[StatusServer.players.online, modpackName]);
                head(StatusServer.players)      

            }
        }

         
    }
    }
    StatusServerAutoRefresh()
})


//function head(status_json) {
//     for (let i = 0; i < status_json.raw.players.sample.length; i++) { 
//         let player = status_json.raw.players.sample[i].name
//         document.querySelector(".player-connect").innerHTML += `<div><img class="users" src="https://mc-heads.net/head/${player}"><b class="users"> ${player}</b></div>`
//     }
// }
function head(StatusServer) {
    if (!!StatusServer.sample) {
        StatusServer.sample.forEach(element => {
            document.querySelector(".player-connect").innerHTML += `<div><img class="users" src="https://mc-heads.net/head/${element.name}"><b class="users"> ${element.name}</b></div>`      
        });
    } else {
        document.querySelector(".player-connect").innerHTML += `<div><b class="users">Indisponible...</b></div>`
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