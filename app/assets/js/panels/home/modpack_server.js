const { config } = require('./assets/js/utils.js');
let modPackSelector = document.querySelector(".select-modpacks")

function modPackInfo(){
  let modpackInfoHtml = document.querySelector(".modpack-info")
  let modpack_selected = config.modpack
  if (modpack_selected.img === "") {
    modpackInfoHtml.innerHTML = 
      `<div class="modpackBody">
      <div class="modpackName">${modpack_selected.name}</div>
      <div class="texemodpackDirectory">${modpack_selected.description}</div>
      <div class="modpackAuthor">Versão: ${modpack_selected.game_version} </div>
      <div class="modpackAuthor">Autor: ${modpack_selected.author}</div>
      </div>
      `
    } else {
      modpackInfoHtml.innerHTML = 
        ` <div class="modpackBody" style="background-image: url(${modpack_selected.img})">
        <div class="modpackName">${modpack_selected.name}</div>
        <div class="texemodpackDirectory">${modpack_selected.description}</div>
      <div class="modpackAuthor">Versão: ${modpack_selected.game_version} </div>
      <div class="modpackAuthor">Autor: ${modpack_selected.author}</div>
      </div>
     `
    }

}
document.querySelector(".select-modpacks").addEventListener('change', function() {
  if(config.modpack_list === 0){
    return;
  }
  config.modpack = config.modpack_list.find(e => e.id == Number(this.value))
  if(config.modpack != null){
    modPackInfo()
  }
});


let modpack_var = config.modpacks().then(modpack => {
  if(modpack.length === 0){
    modPackSelector.innerHTML += `<option value="-1">Nenhum modpack disponível</option>`
  } else {
    config.modpack_list = modpack
    for (let i = 0; i < modpack.length; i++) {
      var modpackName = modpack[i].name
      // var modpackDirectory = modpack[i].directory
      // var modpackImage = modpack[i].img
      // var modpackAuthor = modpack[i].author
      // var modpackGameVersion = modpack[i].game_version
      var modpackDefault = modpack[i].default
      if(modpackDefault){
        config.modpack = modpack[i]  
      }
      modPackSelector.innerHTML += `<option value="${i}">${modpackName}</option>`
    }
    modPackSelector.value = config.modpack.id
    modPackInfo()











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



