const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)

document.querySelector(".noauth").addEventListener("click", () => {
    config.config().then(res => {
        const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
        file.Login = {}
        file.Mode = 0
        fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        location.href = './launcher.html';

    })
})
document.querySelector(".premium").addEventListener("click", () => {
    config.config().then(res => {
        const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
        file.Login = {}
        file.Mode = 1
        fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        location.href = './launcher.html';

    })
})
