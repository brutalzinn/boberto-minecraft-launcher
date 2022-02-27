
config.config().then(config => {
    
    const config_launcher = require(dataDirectory + "/" + config.dataDirectory + "/config.json")
    var java_args_input = document.querySelector(".java_args")
    if(config_launcher.Settings.Java.Args != null){
        java_args_input.value = config_launcher.Settings.Java.Args
    }
    java_args_input.addEventListener('change', async function() {
    
        config_launcher.Settings.Java.Args = this.value
        console.log(this.value)
        fs.writeFileSync(`${dataDirectory}/${config.dataDirectory}/config.json`, JSON.stringify(config_launcher, true, 4), 'UTF-8')
    })

})