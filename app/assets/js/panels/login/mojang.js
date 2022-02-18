const { auth, config, language_service } = require('./assets/js/utils.js')
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)

document.querySelector(".uzurionAppGenHeader").style.display = "block"
document.querySelector(`.loginSpanPremium`).style.display = "none"


document.querySelector(`.uzurionAppLoginCardInformation`).innerHTML = language_service.Tradutor('authentication.premium.login_header_premium') //"Insira seu nome de jogador para jogar no mundo bobertástico. </br> Esse launcher se destina a uso exclusivo dos meus amigos. </br>E não deve ser compartilhado com terceiros."
// document.querySelector(`.uzurion-mail`).innerHTML =  language_service.Tradutor('authentication.premium.login_premium_title_text')
document.querySelector(`.form-check-label`).innerHTML =  language_service.Tradutor('authentication.login_remember_text')

document.querySelector(".uzurionAppLoginCardLabel").innerHTML =  language_service.Tradutor('authentication.premium.login_premium_title_text')
document.querySelector(".uzurionAppSenhaCardLabel").innerHTML =  language_service.Tradutor('authentication.premium.senha_premium_title_text')


document.querySelector(".loginSpanDim").innerHTML =  language_service.Tradutor('authentication.premium.login_lost_password_text')
document.querySelector(".loginSpanNoAuth").innerHTML =  language_service.Tradutor('authentication.premium.login_noauth_text')
document.querySelector(".login-btn").innerHTML =  language_service.Tradutor('play_button_text')

document.querySelector(".login-btn").addEventListener("click", () => {
    if (document.querySelector(".pseudo").value == ""){
        document.querySelector(".uzurion-mail").innerHTML =  language_service.Tradutor('authentication.premium.email_premium_error_text')

        return;
    } else if (document.querySelector(".password").value == ""){
        document.querySelector(".uzurion-password").innerHTML =  language_service.Tradutor('authentication.premium.senha_premium_error_text')

        return;
    }
    document.querySelector(".login-btn").disabled = true
    document.querySelector(".pseudo").disabled = true
    document.querySelector(".password").disabled = true
    document.querySelector(".uzurion-mail").innerHTML = "&nbsp;"
    document.querySelector(".uzurion-password").innerHTML = "&nbsp;"
    document.querySelector(".info-login").style.color = "white";
    document.querySelector(".info-login").innerHTML = "Conexão atual..."
    document.querySelector(".info-login").style.display = "block"

    auth.loginMojang(document.querySelector(".pseudo").value, document.querySelector(".password").value).then(user => {
        config.config().then(res => {
            if(document.querySelector(".loginRemember").checked == true){
                const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
                file.Mode = 1
                file.select = `${user.uuid}`
                file.Login[user.uuid] = user
                fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
            }
        })
        document.querySelector(".user-head").src = `https://mc-heads.net/avatar/${user.name}/100`
        changePanel("login", "home")
    }).catch (err => {
        document.querySelector(".login-btn").disabled = false
        document.querySelector(".pseudo").disabled = false
        document.querySelector(".password").disabled = false
        document.querySelector(".info-login").innerHTML =  language_service.Tradutor('authentication.premium.auth_premium_error')
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
    })
})

document.querySelector(".loginSpanDim").addEventListener("click", () => {
    nw.Shell.openExternal("https://www.minecraft.net/login")
})

document.querySelector(".loginSpanNoAuth").addEventListener("click", () => {
    config.config().then(res => {
    const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
    file.Login = {}
    file.Mode = 0
    location.href = './launcher.html';

    })
})



document.querySelector(".store").addEventListener("click", () => {
    nw.Shell.openExternal("https://www.minecraft.net/store/minecraft-java-edition")
})

document.querySelector(".store-mi").addEventListener("click", () => {
    nw.Shell.openExternal("https://www.minecraft.net/store/minecraft-java-edition")
})


document.addEventListener('keydown', function (e) {
    if(e.key === 'Enter'){
        var click = new Event('click')
        document.querySelector(".login-btn").dispatchEvent(click)
    }
})