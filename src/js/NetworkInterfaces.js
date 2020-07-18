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



// Ah, forgive me, I'm no JS developer
print = console.log



function getNetworkInterfaces(sync = false) {

    // if (process.platform == 'win32')
    //     return getWin32Interfaces()
    // if (process.platform == 'linux')
    //     return getLinuxInterfaces()

    // return new Promise((resolve, reject) => null)


    return (process.platform == 'win32') ? getWin32Interfaces() :
        (process.platform == 'linux') ? getLinuxInterfaces() :
            new Promise((resolve, reject) => null)



}

// function getWin32NetworkInterfaces() {
//     exec('ipconfig /all', (eror, stdout, stderr) => {
//         console.log(stdout)
//     })
// }





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


    return data.map((item) => {
        item['MacAddress'] = item['MacAddress'].replace(/-/g, ':')
        return item
    })

}


//  TODO: Implement
function getLinuxInterfacesSync() {
    return null;
}


async function getLinuxInterfaces() {
    rawInterfaceData = await (execFile('ifconfig')).then(data => data.stdout)

    interfaceList = rawInterfaceData.split('\n\n').filter(x => x)

    return interfaceList.map(adapter => {

        result = {}

        stateRunningData = adapter.match(/<([A-Z,]*)>/g)

        if (stateRunningData !== null) {

            result['State'] = stateRunningData[0].includes('UP') ? 'UP' : 'DOWN'
            result['Running'] = stateRunningData[0].includes('RUNNING')
            result['Loopback'] = stateRunningData[0].includes('LOOPBACK')

            result['Alias'] = adapter.split(': ', 1)

            result['MacAddress'] = result['Loopback'] ? '' : adapter.match(/\w\w:\w\w:\w\w:\w\w:\w\w:\w\w/g)[0]

        }

        return result

    }).filter(adapter => !adapter['Loopback'])

}








module.exports = {
    getNetworkInterfaces
}




print('one')
print('two')

getLinuxInterfaces().then(x => print(x))
// getNetworkInterfaces().then(data => {
//     for (item of data) {
//         result = {}

//         stateRunningData = item.match(/<([A-Z,]*)>/g)

//         if ( stateRunningData !== null && !  stateRunningData[0].includes('LOOPBACK')) {

//             result['State'] = stateRunningData[0].includes('UP') ? 'UP' : 'DOWN'
//             result['Running'] = stateRunningData[0].includes('RUNNING')

//             result['Alias'] = item.split(': ', 1)

//             result['MacAddress'] = item.match(/\w\w:\w\w:\w\w:\w\w:\w\w:\w\w/g)[0]

//             print(result)
//         }
//     }
// })

print('three')
print('four')


// TODO: Linux patterns
// [
//     r'(?P<device>^[-a-zA-Z0-9:\.]+): flags=(?P<flags>.*) mtu (?P<mtu>\d+)',
//     r'.*inet\s+(?P<inet4>[\d\.]+).*',
//     r'.*inet6\s+(?P<inet6>[\d\:abcdef]+).*',
//     r'.*broadcast (?P<broadcast>[^\s]*).*',
//     r'.*netmask (?P<netmask>[^\s]*).*',
//     r'.*ether (?P<ether>[^\s]*).*',
// ] + [
//     r'(?P<device>^[a-zA-Z0-9:_\-\.]+)(.*)Link encap:(.*).*',
//     r'(.*)Link encap:(.*)(HWaddr )(?P<ether>[^\s]*).*',
//     r'.*(inet addr:\s*)(?P<inet4>[^\s]+).*',
//     r'.*(inet6 addr:\s*)(?P<inet6>[^\s\/]+)',
//     r'.*(MTU:\s*)(?P<mtu>\d+)',
//     r'.*(P-t-P:)(?P<ptp>[^\s]*).*',
//     r'.*(Bcast:)(?P<broadcast>[^\s]*).*',
//     r'.*(Mask:)(?P<netmask>[^\s]*).*',
//     r'.*(RX bytes:)(?P<rxbytes>\d+).*',
//     r'.*(TX bytes:)(?P<txbytes>\d+).*',
// ]