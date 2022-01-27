const fs = require("fs");
const { mojang, microsoft } = require('minecraft-java-core');
const pkg = require("../package.json");
const Microsoft = new microsoft()
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)
const { config, auth } = require('./assets/js/utils.js');
let win = nw.Window.get()
const event = document.createEvent('Event');
event.initEvent('change_panel', true, true);

if(process.platform == "win32") {
  document.querySelector(".frame").classList.toggle("hide")
  document.querySelector(".dragbar").classList.toggle("hide")
  
  document.querySelector("#minimize").addEventListener("click", () => {
    win.minimize()
  });

  let maximized = false;
  let maximize = document.querySelector("#maximize")
  maximize.addEventListener("click", () => {
    if(maximized) win.unmaximize()
    else win.maximize()
    maximized = !maximized
    maximize.classList.toggle("icon-maximize")
    maximize.classList.toggle("icon-restore-down")
  });

  document.querySelector("#close").addEventListener("click", () => {
    win.close();
  })
  document.querySelector(".titlebar-launcher-frame").innerHTML = `${pkg.window.title}-${pkg.version}`  

}

function changePanel(V1, V2){
  if(V1 == ""){
    document.querySelector(`.${V2}`).style.display = "block"
  } else if (V1 == "login"){
    document.querySelector(`.${V1}`).style.display = "none"
    document.querySelector(`.${V2}`).style.display = "block"
    document.querySelector(".login-btn").disabled = false
    document.querySelector(".pseudo").disabled = false
    document.querySelector(".microsoft-btn").disabled = false
    document.querySelector(".password").disabled = false
  } else {
    document.querySelector(`.${V1}`).style.display = "none"
    document.querySelector(`.${V2}`).style.display = "block"

  }
  document.dispatchEvent(event)
}

(function(...panels){
  let panelsElem = document.querySelector("#panels")
  for(let panel of panels){
    console.log(`Initializing ${panel} Panel...`)
    let div = document.createElement("div")
    div.classList.add("panel", panel)
    div.innerHTML = fs.readFileSync(`app/panels/${panel}.html`, "utf8")
    panelsElem.appendChild(div);
    import (`./panels/${panel}.js`)
  }
})('settings','login', 'home')


config.config().then(async (res) => {
  let path = `${dataDirectory}/${res.dataDirectory}/config.json`
  
  if(fs.existsSync(path)) {
    let file = require(path)
    config.config_cache = file
    let getuser = auth.getUser(file.Login)
    
    if(getuser === null){
      changePanel("", "login")
    } else {
      for(let user of getuser){
        if(user.meta.type === "msa") {
          await Microsoft.refresh(user).then(msa => file.Login[msa.uuid] = msa).catch(error => {
            delete file.Login[user.uuid]
            changePanel("", "login")
          })
        } else if(user.meta.type === "mojang") {
          if(user.meta.offline) continue
          await auth.refreshAuth(user).then(mojang => file.Login[mojang.uuid] = mojang).catch(error => {
            delete file.Login[user.uuid]
            changePanel("", "login")
          })
        }
      }
      fs.writeFileSync(path, JSON.stringify(file, true, 4))
      if(!file.Login[file.select] || file.Login[file.select] === "") {
        changePanel("", "login")
      } else {
        document.querySelector(".user-head").src = `https://mc-heads.net/avatar/${file.Login[file.select].name}/100`
        changePanel("login", "home")
      }
    }
  
  } else {
    changePanel("", "login")
  }
  
  //document.querySelector(".start-loader").style.display = "none"
})