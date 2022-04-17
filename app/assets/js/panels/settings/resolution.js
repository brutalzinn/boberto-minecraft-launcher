const { config } = require('./assets/js/utils.js');

let fileConfig = config.ReadConfig()
//wrong way to do this. Its only to put a !== null here. But not today.
if(fileConfig.Settings.Resolution.width === null || fileConfig.Settings.Resolution.height === null){

} else {
document.querySelector(".width").value = fileConfig.Settings.Resolution.width
document.querySelector(".height").value = fileConfig.Settings.Resolution.height
}
