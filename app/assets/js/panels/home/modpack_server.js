const { config } = require('./assets/js/utils.js');
//let modpackForm = document.querySelector(".container-modpacks")
let modPackSelector = document.querySelector(".select-modpacks")


let modpack_var = config.modpacks().then(config => {
 // modpackForm.innerHTML = ``
  if(config.length === 0){
    modPackSelector.innerHTML += `<option value="-1">Nenhum modpack disponível</option>`
  } else {
    for (let i = 0; i < config.length; i++) {
      var modpackName = config[i].name
      var modpackDirectory = config[i].directory
      var modpackImage = config[i].img
      var modpackAuthor = config[i].author
      var modpackGameVersion = config[i].game_version
      modPackSelector.innerHTML += `<option value="${i}">${modpackName}</option>`
    }












      // if (modpackImage === "") {
      //   modpackForm.innerHTML += 
      //   `<div class="modpackBody">
      //   <div class="modpackName">${modpackName}</div>
      //     <div class="texemodpackDirectory">${modpackDirectory}</div>
      //   </div>
      //   <div class="modpackAuthor">Por ${modpackAuthor}, de ${modpackGameVersion}</div>`
      // } else {
      //    modpackForm.innerHTML += 
      //    ` <div class="modpackBody">
      //    <div class="modpackName">${modpackName}</div>
      //     <div class="texemodpackDirectory">${modpackDirectory}
      //       <img class="modpackImage" src="${modpackImage}">
      //     </div>
      //   </div>
      //   <div class="modpackAuthor">Par ${modpackAuthor}, le ${modpackGameVersion}</div>`
      // }
    
  
  }
  NewsAutoRefresh()
})

function NewsAutoRefresh(){
  config.config().then(config => {
    const config_var = require(`${dataDirectory}/${config.dataDirectory}/config.json`)
    if(config_var.Launcher.NewsAutoRefresh === true){
      setInterval(function(){
        modpack_var
      }, 600000)
    }
  })
}



