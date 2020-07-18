// JS for Index.html pa
const electron = require('electron')


const {
    getNetworkInterfaces
} = require(`./NetworkInterfaces.js`)

function updateSidePanel(element) {

    targetImage = document.getElementById('InterfaceImage')

    // targetImage['src']  = 

    targetText = document.getElementById('InterfaceText')

    targetText.innerHTML =
        `<!-- (つ◕౪◕)つ━☆ﾟ.*･｡ﾟ -->
        Interface Name: ${element.dataset.ifalias}
        <br>
        Current MAC: ${element.dataset.macaddress}
    `

}


/* ̿̿ ̿'̿'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿ */
window.onload = () => {
    getNetworkInterfaces().then(interfaces => {

        console.log(interfaces)

        interfaceText = interfaces.map(interface =>
            `<a href="#" class="teal item"
                data-MacAddress = ${interface['MacAddress']} 
                data-ifAlias = ${interface['ifAlias']}
                data-LinkSpeed = ${interface['LinkSpeed']}
                onmouseover = updateSidePanel(this)
                
             >
             <i></i>
                ${interface['ifAlias']}
            </a>`
        ).join('\n')

        const list = document.getElementById('InterfaceMenu')
        list.innerHTML =
            `<!-- Network Interfaces here -->

                <div class="header item">
                    Network Interfaces
                </div>

                ${interfaceText}

                <div class="item">
                    <a>
                        <i class="tty icon"></i>
                        lorem ipsum
                        <div class="ui teal left pointing label">1</div>
                    </a>

                </div>

                <script type='text/javascript'>
                    $('#InterfaceMenu')
                        .dropdown()
                    ;
                </script>

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



module.exports = {
    updateSidePanel
}