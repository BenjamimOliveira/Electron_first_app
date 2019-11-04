const electron = require('electron')
const url = require('url')
const path = require('path')

// -- Módulo responsavel por controlar a "aplication life"
const app = electron.app

// -- Módulo pra criar a janela browser nativa
const BrowserWindow = electron.BrowserWindow


// -- Devemos manter uma referencia global do objeto janela, para que
// -- esta não seja garbage collected
let mainWindow

function createWindow() {
    // -- Criar a janela do browser
    mainWindow = new BrowserWindow({
        width: 1405,
        height: 800,
        minWidth: 1405,
        minHeight: 800,
        webPreferences: {nodeIntegration: true}
    })

    // -- Carregar o index.html da app
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // -- Abre o DevTools
    //mainWindow.webContents.openDevTools()

    // -- Lançado quando a janela é fechada
    mainWindow.on('closed', function(){
        // -- Desreferenciar o objeto janela
        // -- se tivermos a armazenar um array dee janelas deveremos eliminar o mesmo (no caso de uma app com varias windows)
        mainWindow = null
    })
}

// -- Este método é invocado quando o Electron tiver acabado de inicializar
// -- Algumas APIs só podem ser usadas após este evento
app.on('ready', createWindow)

// -- Sair quando todas as janelas são fechadas
app.on('window-all-closed', function () {
    // -- Em OS X é comum que a aplicação e respetivo
    // -- menu bar se mantem ativos até o utilizador fechar
    // -- explicitamente usando Cmd + Q
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // -- Em OS X é comum recriar uma janela quando 
    // -- o icon presente no dock é clicado e não há janelas já abertas
    if(mainWindow === null){
        createWindow()
    }
})

