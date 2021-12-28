document.querySelector(".noauth").addEventListener("click", () => {
    config.config().then(res => {
        const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
        file.Login.UserConnect = null
        file.Login.Account = null
        file.Login.Mode = 0
        fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        location.href = './launcher.html';

    })
})
document.querySelector(".premium").addEventListener("click", () => {
    config.config().then(res => {
        const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
        file.Login.UserConnect = null
        file.Login.Account = null
        file.Login.Mode = 1
        fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        location.href = './launcher.html';

    })
})
