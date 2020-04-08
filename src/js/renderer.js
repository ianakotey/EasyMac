//I'm gonna leave you blank for now 

//Now let's code some  (つ◕౪◕)つ━☆ﾟ.*･｡ﾟ 


const electron = require('electron')

const {
    get_interfaces
} = require(`./mac_${process.platform}.js`)


/* ̿̿ ̿'̿'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿ */
window.onload = () => {
    get_interfaces().then(interfaces => {

        interfaceText = interfaces.map(interface => `<li class="collection-item green-text center-align btn" style="display:block">${interface['Interface Name']}</li>\n`).join('')
        console.log(interfaces)


        const list = document.querySelector('div.col.s7.m7.l9.teal > ul')
        list.innerHTML =
        `<!-- Network Interfaces here -->
        <li class="collection-header center-align blue-text">Network Interfaces</li>
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