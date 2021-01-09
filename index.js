const {app, BrowserWindow, ipcMain} = require('electron')
const path                          = require('path')
const url                           = require('url')

app.disableHardwareAcceleration()

app.allowRendererProcessReuse = true

let win

function createWindow() {

    win = new BrowserWindow({
        width: 980,
        height: 625,

        // Dislable the system frame
        // frame : false,

        icon: path.join(__dirname, 'build', 'icon.png'),
        menu: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        backgroundColor: '#fff'
    })

    // Choose the folder with your code
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.removeMenu()

    // Let the user to resize the windows
    win.resizable = true

    win.on('closed', () => {
        win = null
    })

    // When a link is oppenned on new window, it's oppen on default browser
    win.webContents.on('new-window', function(evt, url) {
        evt.preventDefault();
        shell.openExternal(url);
      });


}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
