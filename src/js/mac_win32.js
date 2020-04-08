const {
    execSync,
    spawn
} = require('child_process')
const {
    promisify
} = require('util')

const exec = promisify(require('child_process').exec)

async function get_interfaces_from_cmd() {


    return (await exec('netsh interface show interface')).stdout


}

async function get_interfaces() {

    //wait for output, split into individual lines and remove empty strings
    interface_data = (await get_interfaces_from_cmd()).split('\r\n').filter(x => x).sort( (a, b) => a["Interface Name"] - b["Interface Name"] )


    interface_names = interface_data[0].split(/\s\s+/)


    interfaces = interface_data.slice(2, interface_data.length).map((interface) => {
        temp = {}
        interface.split(/\s\s+/).map((data, index) => {
            temp[interface_names[index]] = data
        })
        return temp
    })

    //console.log(interfaces)

    return interfaces

}

module.exports = {
     get_interfaces
}




// document.querySelector('#test').addEventListener('click', (event) => { 
//     console.log(event.target)
//      document.querySelector('#testText').innerHTML = get_interfaces()
// })