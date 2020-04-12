const electron = require('electron')
const path = require('path')
const url = require('url')

let win;

process.env.NODE_ENV = 'prod';


const inDevelopment = () => process.env.NODE_ENV === 'development'



electron.app.on('ready', () => {
    createWindow();
});

electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron.app.quit()
});


function createWindow() {

    win = new electron.BrowserWindow(
        {
            width: 800,
            height: 600,
            minWidth: 800,
            minHeight: 600,
            icon: path.join(__dirname, "../../assets/img/icons8-person-24.png"),
            frame: inDevelopment(),
            radii: [5, 5, 5, 5],
            webPreferences: { nodeIntegration: true }
        }
    )

    let first_url = url.format({
        pathname: path.join(__dirname, `../html/index.html`),
        protocol: 'file:',
        slashes: true
    })

    win.loadURL(first_url)

    if (inDevelopment())
        win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })

}