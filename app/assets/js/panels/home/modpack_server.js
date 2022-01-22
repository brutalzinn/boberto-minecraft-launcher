const { config } = require('./assets/js/utils.js');
const { status } = require('minecraft-java-core');

let modPackSelector = document.querySelector(".select-modpacks")

 function modPackInfo(){
  let modpackInfoHtml = document.querySelector(".modpack-info")
  let modpack_selected = config.modpack_selected

  if (modpack_selected.img === "") {

    modpackInfoHtml.innerHTML = 
      `<div class="modpackBody">
      <div class="modpackName">${modpack_selected.name}</div>
      <div class="texemodpackDirectory">${modpack_selected.description}</div>
      <div class="class-status">Status: Carregando...</div>
      <div class="Version">Versão: ${modpack_selected.game_version} </div>
      <div class="Author">Autor: ${modpack_selected.author}</div>
      </div>
      `
    } else {
      modpackInfoHtml.innerHTML = 
        ` <div class="modpackBody" style="background-image: url(${modpack_selected.img})">
        <div class="modpackName">${modpack_selected.name}</div>
        <div class="texemodpackDirectory">${modpack_selected.description}</div>
        <div class="class-status">Status: Carregando...</div>
      <div class="Version">Versão: ${modpack_selected.game_version} </div>
      <div class="Author">Autor: ${modpack_selected.author}</div>
      </div>
     `
    }
    status.StatusServer( modpack_selected.server_ip, parseInt( modpack_selected.server_port)).then((result)=>
    {
      document.querySelector(".class-status").innerHTML = `<div class="class-status">Status: ${result ? "Online" : "Offline"}</div>`
    })
}
  document.querySelector(".select-modpacks").addEventListener('change', function() {
  if(config.modpack_cache.length === 0){
    return
  }
  config.modpack_selected = config.modpack_cache.find(e => e.id == this.value)
  console.log(config.modpack_selected )

  if(config.modpack_selected != null){
    modPackInfo()
  }
});

 

let modpack_var = config.modpacks().then( modpack => {
 let nonpremiumuser =  config.config_cache.Mode == 0
 let premiumuser =  config.config_cache.Mode == 1

  if(modpack.length === 0){
    modPackSelector.innerHTML += `<option value="-1">Nenhum modpack disponível</option>`
  } else {
    config.modpack_cache = modpack
    for (let i = 0; i < modpack.length; i++) {
   
      let modpackName = modpack[i].name
      let modpackDefault = modpack[i].default

      if(modpackDefault){
        config.modpack_selected = modpack[i]  
      }
      
      if (modpack[i].premium && premiumuser || !modpack[i].premium && premiumuser){
        modPackSelector.innerHTML += `<option value="${modpack[i].id}">${modpackName}</option>`
      }else if(!modpack[i].premium && nonpremiumuser){
        modPackSelector.innerHTML += `<option value="${modpack[i].id}">${modpackName}</option>`

      }
    }
    modPackSelector.value = config.modpack_selected.id
    console.log(config.modpack_selected)
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



