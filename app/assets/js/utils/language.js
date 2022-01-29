
const config = require('./config')
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)



const Tradutor = (chave) => {
    let languages = `${dataDirectory}/${config.launcher_dir}/language`
    let file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
    let lang = require(`${languages}/${file.Launcher.Language}.json`)
     return  chave.split('.').reduce((o,i)=>o[i], lang);
}

const TradutorVars = (input, variables) => {
    var languages = `${dataDirectory}/${config.launcher_dir}/language`
    let file = require(`${dataDirectory}/${config.launcher_dir}/config.json`);
    let lang = require(`${languages}/${file.Launcher.Language}.json`)

    var traduzido =  input.split('.').reduce((o,i)=>o[i], lang);

    var algarismos = ["0","1","2","3","4","5","6","7","8","9"]
    var ocorrencia = 0
    for(var i = 0 ; i < traduzido.length;i++){
        if(algarismos.includes(traduzido[i])){
            traduzido = traduzido.replace(ocorrencia, variables[ocorrencia])
            ocorrencia++; 
        }
        if(ocorrencia === variables.length){
            return traduzido
        }
    }
}



module.exports = {
    Tradutor,
    TradutorVars
}