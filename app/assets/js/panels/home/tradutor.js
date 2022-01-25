
const { languages, config } = require('./assets/js/utils.js');

config.config().then(res => {
    document.querySelector(".play-btn").innerHTML = languages.Tradutor('play_button_text', res.dataDirectory)
})
