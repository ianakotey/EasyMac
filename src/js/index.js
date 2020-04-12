// JS for Index.html pa
const electron = require('electron')


const {
    getNetworkInterfaces
} = require(`./NetworkInterfaces.js`)

function updateSidePanel(element) {
    console.log(element.dataset.Alias)
    console.log(element.dataset.MacAddress)
    console.log(element.dataset.LinkSpeed)
}


/* ̿̿ ̿'̿'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿ */
window.onload = () => {
    getNetworkInterfaces().then(interfaces => {

        interfaceText = interfaces.map( interface => 
            `<li class="collection-item green-text center-align btn"
            data-MacAddress = ${interface['MacAddress']} 
            data-Alias = ${interface['Alias']}
            data-LinkSpeed = ${interface['LinkSpeed']}
            onmouseover = updateSidePanel(this)
            style="display:block">${interface['MacAddress']}</li>\n`
        ).join('')

        const list = document.querySelector('div.col.s7.m7.l9.teal > ul')
        list.innerHTML =
            `<!-- Network Interfaces here -->

            <li class="collection-header center-align black-text btn btn-transparent"
            style="display:block">Network Interfaces</li>
            ${interfaceText}

            <!-- End of Network Interfaces -->`

    })
}


document.querySelector('#minimize').addEventListener('click', () => {
    electron.remote.getCurrentWindow().minimize();
});


document.querySelector('#maximizeOrRestore').addEventListener('click', (event) => {
    const currentWindow = electron.remote.getCurrentWindow();
    if (currentWindow.isMaximized()) {
        currentWindow.unmaximize()
        event.target.innerText = '☆ﾟ'
    } else {
        currentWindow.maximize()
        event.target.innerText = '♡'
    }

});

document.querySelector('#close').addEventListener('click', () => {
    electron.remote.app.quit();
});