const process = require('process')
const {exec} = require('child_process')

function getNetworkInterfaces() {
    if (process.platform === 'win32')
        return getWin32NetworkInterfaces()
    return
}

function getWin32NetworkInterfaces() {
    exec('ipconfig /all', (eror, stdout, stderr) => {
        console.log(stdout)
    })
}

getNetworkInterfaces()

