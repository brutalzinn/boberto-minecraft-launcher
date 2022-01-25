const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)

const Tradutor = (chave, launcherdir) => {
    var languages = `${dataDirectory}/${launcherdir}/language`
    let file = require(`${dataDirectory}/${launcherdir}/config.json`);
    let lang = require(`${languages}/${file.Launcher.Language}.json`)
    return lang[chave]
}

const TradutorVars = (input, variables, launcherdir) => {
    var languages = `${dataDirectory}/${launcherdir}/language`
    let file = require(`${dataDirectory}/${launcherdir}/config.json`);
    let lang = require(`${languages}/${file.Launcher.Language}.json`)

    var traduzido = lang[input]
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