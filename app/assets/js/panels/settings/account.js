const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const { config } = require('./assets/js/utils.js');

document.querySelector(".noauth").addEventListener("click", () => {
  
        const file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
        file.Login = {}
        file.Mode = 0
        fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        location.href = './launcher.html';

   
})
document.querySelector(".premium").addEventListener("click", () => {
  
        const file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
        file.Login = {}
        file.Mode = 1
        fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
        location.href = './launcher.html';

})
