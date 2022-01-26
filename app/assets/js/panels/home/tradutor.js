
const { languages, config } = require('./assets/js/utils.js');

config.config().then(res => {
    document.querySelector(".play-btn").innerHTML = languages.Tradutor('play_button_text', res.dataDirectory)
    document.querySelector(".force-update").innerHTML = languages.Tradutor('force_update_checkbox_text', res.dataDirectory)
    document.querySelector(".player-connect-head-text").innerHTML = languages.Tradutor('server_list_status_title_text', res.dataDirectory)


    
})
