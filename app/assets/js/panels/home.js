import ("./home/start_game.js")
import ("./home/news_server.js")
import ("./home/status_server.js")
import ("./home/modpack_server.js")


document.querySelector(".settings-btn").addEventListener("click", () => {
    changePanel("home", "settings")
})


