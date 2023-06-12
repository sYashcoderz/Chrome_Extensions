chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if (msg.command == "runcommands") {
        
        window.ScraperExt = [];
        let scrapeObj = msg.data;
        console.log(scrapeObj)
        getNextItem(scrapeObj, 0);

    }
});

function getNextItem(obj, index) {
    if (typeof obj[index] !== 'undefined') {

        if (obj[index].type == 'click') {
            clickEvent(obj, index);
        } 
        if (obj[index].type == 'wait') {
            waitEvent(obj, index);
        }
        if (obj[index].type == 'save') {
            saveEvent(obj, index);
        }
        if (obj[index].type == 'enter') {
            enterEvent(obj, index);
        }
        else {
            chrome.runtime.sendMessage({ command: "run-complete", data: window.ScraperExt });

        }
    }
}

function waitEvent(obj, index) {
    var item = obj[index];
    let waitTime = parseInt(item.one);
    setTimeout(function () {
        getNextItem(obj, (index + 1));
    }, waitTime);
}

function clickEvent(obj, index) {
    var item = obj[index];
    document.querySelector(item.one).click();
    getNextItem(obj, (index + 1));

}

function saveEvent(obj, index) {
    var item = obj[index];
    console.log("pppp==>", item)
    var value = document.querySelector(item.one).innerText;
    window.ScraperExt.push(value);
    getNextItem(obj, (index + 1));
}

function enterEvent(obj, index) {
    var item = obj[index];
    let value = document.querySelector(item.one).value = item.two;
    getNextItem(obj, (index + 1));

}