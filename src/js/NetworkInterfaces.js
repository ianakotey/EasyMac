const process = require('process')
let {
    exec,
    execFile,
    execSync,
    execFileSync,
    spawn
} = require('child_process')

const {
    inspect,
    promisify
} = require('util')

execFile = promisify(execFile)

// forgive me, I'm no JS developer
print = console.log

function getNetworkInterfaces(sync = false) {
    if (process.platform === 'win32')
        return getWin32NetworkInterfaces(sync = sync)
    return
}

// function getWin32NetworkInterfaces() {
//     exec('ipconfig /all', (eror, stdout, stderr) => {
//         console.log(stdout)
//     })
// }

function parseInterfaceData(data) {

    data = data.split('\r\n').filter(x => x)

    // * headings, or keys in a dictionary(excuse my Python)
    keys = data[0].split(/\s\s+/)

    interfaces = data.slice(2, data.length).map((interface) => {
        temp = {}
        interface.split(/\s\s+/).map((item, index) => {
            temp[keys[index]] = item
        })
        return temp
    })

    return interfaces

}


function getWin32InterfacesSync() {
    data = execFileSync('powershell',
        ['Get-NetAdapter', '-Name', '"*"', '-Physical', '|', 'ConvertTo-Json']
    ).toString()

    // print(data)

    return JSON.parse(data)

}

async function getWin32Interfaces() {
    data = await (execFile('powershell',
        ['Get-NetAdapter', '-Name', '"*"', '-Physical', '|', 'ConvertTo-Json']
    )).then((data) => JSON.parse(data.stdout))

    return data
}


print('one')
print('two')

getWin32Interfaces().then(data => {
    for (item of data) {
        print(item['MacAddress'])
    }
})

print('three')
print('four')