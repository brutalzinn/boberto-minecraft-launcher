const { config } = require('./assets/js/utils.js');

config.config().then(res => {
  var file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);

  if (file.Login.Mode == 0) {
    console.log(`Initializing crack Panel...`)
    import ("./login/crack.js")
  } else {
    console.log(`Initializing microsoft Panel...`)
    import ("./login/microsoft.js")
    console.log(`Initializing mojang Panel...`)
    import ("./login/mojang.js")
  }
})