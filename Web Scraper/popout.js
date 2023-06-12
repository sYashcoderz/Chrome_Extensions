


chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.command == 'runcomplete') {
        document.querySelector('textarea').value = JSON.stringify( msg.data); 
        document.querySelector('textarea').style.display='block';
        alert("Command Has been run")

    }
});

function createCommandObject() {
    commandsArr = [];

    let commands = document.querySelectorAll('.commands-list .command-item');
    for (let i = 0; i < commands.length; i++) {
        let itemObj = {};
        itemObj.type = commands[i].querySelector('select').value;
        itemObj.one = commands[i].querySelector('.value-1').value;
        itemObj.two = commands[i].querySelector('.value-2').value;
        commandsArr.push(itemObj);
    }

    console.log(commandsArr);
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        let activeTab = tabs[0];
        let obj = commandsArr;
        chrome.tabs.sendMessage(activeTab.id, { command: "runcommands", data: obj });
    });
}

document.querySelector('.run-command').addEventListener('click', function () {
    createCommandObject();
});

document.querySelector('.new-command').addEventListener('click', function () {
    let newItem = `<div class= "command-item" >
    <select>
        <option value="wait">Wait</option>
        <option value="click">click</option>
        <option value="enter">enter</option>
        <option value="save">save</option>
    </select>
    <input class="value-1" placeholder="200ms"/>
    <input class="value-2" placeholder="optional"/>
</div>`
    document.querySelector('.commands-list').innerHTML += newItem;
});
