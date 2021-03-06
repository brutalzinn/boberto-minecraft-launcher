const nodemon = require("nodemon");
const AutoUpdater = require("nw-autoupdater-luuxis");
const pkg = require("../package.json");
if((pkg.user) === undefined || (pkg.user) === ""){
  var url = pkg.url
} else {
  var url = pkg.url + "/" + pkg.user
}
const manifestUrl = url + "/launcher/package.json";

const { config, compare } = require('./assets/js/utils.js');
const updater = new AutoUpdater(pkg, { strategy: "ScriptSwap" });

const win = nw.Window.get();
const Dev = (window.navigator.plugins.namedItem('Native Client') !== null);

const splash = document.querySelector(".splash");
const splashMessage = document.querySelector(".splash-message");
const splashAuthor = document.querySelector(".splash-author");
const message = document.querySelector(".message");
const progress = document.querySelector("progress");
document.addEventListener('DOMContentLoaded', () => { startAnimation() });
win.on('resize', (width, height) => {
  win.resizeTo(400, 500);
});
async function startAnimation(){
 
  await sleep(100);
  document.querySelector("#splash").style.display = "block";
  await sleep(500);
  splash.classList.add("opacity");
  await sleep(500);
  splash.classList.add("translate");
  splashMessage.classList.add("opacity");
  splashAuthor.classList.add("opacity");
  message.classList.add("opacity");
  await sleep(1000);
  maintenanceCheck();
}



async function maintenanceCheck(){
  nw.App.clearCache();
  if(Dev) return startLauncher();  
  config.config().then(res => {
    if ((res.maintenance) == "on"){
      return shutdown(res.maintenance_message);
    }
    checkUpdate();
  }).catch( err => {
    console.log("Impossível carregar config.json");
    console.log(err);
    return shutdown("Nenhuma conexão de internet detectada, <br> tente novamente mais tarde.");
  })
}

async function checkUpdate(){

  setStatus(`Checando atualização..`);
  const manifest = await fetch(manifestUrl).then(res => res.json());
  const update = await updater.checkNewVersion(manifest);
  if(!update) return startLauncher();

  updater.on("download", (dlSize, totSize) => {
    setProgress(dlSize, totSize);
  });
  updater.on("install", (dlSize, totSize) => {
    setProgress(dlSize, totSize);
  });

  toggleProgress();
  setStatus(`Baixando atualização..`);
  const file = await updater.download(manifest);
  setStatus(`Descompactando atualização..`);
  await updater.unpack(file);
  toggleProgress();
  setStatus(`Reiniciar`);
  await updater.restartToSwap();
}
  
function startLauncher(){
  setStatus(`Iniciando o lançador`);
  nw.Window.open("app/launcher.html", {
    "title": pkg.productName,
    "width": 1280,
    "height": 720,
    "min_width": 980,
    "min_height": 552,
    "frame": (process.platform == "win32") ? false : true,
    "position": "center",
    "icon": "app/assets/images/icons/icon.png"
  });
  win.close();
}

function shutdown(text){
  setStatus(`${text}<br>Fechando em 5s`);
  let i = 4;
  setInterval(() => {
    setStatus(`${text}<br>Fechando em ${i--}s`);
    if(i < 0) win.close();
  }, 1000);
}

function setStatus(text){
  message.innerHTML = text;
}

function toggleProgress(){
  if(progress.classList.toggle("show")) setProgress(0, 1);
}

function setProgress(value, max){
  progress.value = value;
  progress.max = max;
}


function sleep(ms){
  return new Promise((r) => { setTimeout(r, ms) });
}
