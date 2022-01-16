const { auth, config } = require('./assets/js/utils.js');
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)

document.querySelector(`.online`).style.display = "none"
document.querySelector(`.microsoft-btn`).style.display = "none"
document.querySelector(`.loginSpanDim`).style.display = "none"
document.querySelector(`.loginSpanNoAuth`).style.display = "none"

document.querySelector(`.uzurionAppLoginCardInformation`).innerHTML = "Insira seu nome de jogador para jogar no mundo bobertástico. </br> Esse launcher se destina a uso exclusivo dos meus amigos. </br>E não deve ser compartilhado com terceiros."
document.querySelector(`.uzurionAppLoginCardLabel`).innerHTML = "nome do usuário"
document.querySelector(".uzurionAppGenHeader").style.display = "block"

document.querySelector(".login-btn").addEventListener("click", () => {
    if (document.querySelector(".pseudo").value == ""){
        document.querySelector(".info-login").innerHTML = "entre com seu nome de usuário"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
        return;
    }

    if (document.querySelector(".pseudo").value.length < 3) {
       document.querySelector(".info-login").innerHTML = "Seu nome de usuário deve ter pelo menos 3 caracteres"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
        return;
    }

    document.querySelector(".login-btn").disabled = true
    document.querySelector(".pseudo").disabled = true
    document.querySelector(".info-login").style.color = "#000000";
    document.querySelector(".info-login").innerHTML = "Conexão atual ..."
    document.querySelector(".info-login").style.display = "block"
    auth.loginMojang(document.querySelector(".pseudo").value).then(user => {
        config.config().then(res => {
            if(document.querySelector(".loginRemember").checked == true){
                const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
                file.Login.Mode = 0
                file.Login.UserConnect = "Crack"
                file.Login.Account = {"Crack":{"User": user}} 
                fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
            }
        })
        document.querySelector(".user-head").src = `https://mc-heads.net/avatar/${user.name}/100`
        changePanel("login", "home")
    }).catch (err => {
        document.querySelector(".login-btn").disabled = false
        document.querySelector(".pseudo").disabled = false
        document.querySelector(".info-login").innerHTML = "error"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
    })
})
document.querySelector(".loginSpanPremium").addEventListener("click", () => {
    config.config().then(res => {
    const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
    file.Login.Mode = 1
    file.Login.UserConnect = null
    file.Login.Account = null
    location.href = './launcher.html';

    })
})

document.addEventListener('keydown', function (e) {
    if(e.key === 'Enter'){
        var click = new Event('click')
        document.querySelector(".login-btn").dispatchEvent(click)
    }
})