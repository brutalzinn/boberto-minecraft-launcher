const file = document.querySelector(".path-file")
const { config } = require('./assets/js/utils.js');

const path = document.querySelector(".path")

const files = require(`${dataDirectory}/${config.launcher_dir}/config.json`)
if(files.Settings.Java.Directory === null){
  if(["win32"].includes(process.platform)){
    var java = "/bin/java.exe"
  } else if(["darwin"].includes(process.platform)){
    var java = "/Contents/Home/bin/java"
  } else if(["linux"].includes(process.platform)){
    var java = "/bin/java"
  }
  var Java = `${dataDirectory}/${config.launcher_dir}/runtime/java${java}`
} else {
  var Java = files.Settings.Java.Directory
}

path.value = Java

document.querySelector(".path-button").addEventListener("click", async () => {
  file.value = ""
  file.click()

  await new Promise((resolve) => {
    let interval
    interval = setInterval(() => {
      if(file.value != "") resolve(clearInterval(interval))
    }, 100)
  })

  if(file.value.replace(".exe", "").endsWith("java") || file.value.replace(".exe", "").endsWith("javaw")){
    files.Settings.Java.Directory = file.value.replace(/\\/g, "/")
    path.value = files.Settings.Java.Directory
    fs.writeFileSync(`${dataDirectory}/${config.launcher_dir}/config.json`, JSON.stringify(files, true, 4), 'UTF-8')
  } else {}
})
