const { config } = require('./assets/js/utils.js');
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)

config.config().then(res => {
  var file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
  if (file.Mode == 0) {
    console.log(`Initializing crack Panel...`)
    import ("./login/crack.js")
  } else {
    console.log(`Initializing microsoft Panel...`)
    import ("./login/microsoft.js")
    console.log(`Initializing mojang Panel...`)
    import ("./login/mojang.js")
  }
})