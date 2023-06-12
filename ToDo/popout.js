// const items = [{ "item": "I am Anandian", "status": 0 },
// { "item": "I am Forceboltian", "status": 1 }];

// const itemstr = JSON.stringify(items);

// console.log(itemstr);
// console.log(items);

document.querySelector('.create-todo').addEventListener('click', function () {
    document.querySelector('.new-item').style.display = 'block';
    console.log("Add Item");
});

document.querySelector('.new-item button').addEventListener('click', function () {
    let itemName = document.querySelector('.new-item input').value;
    if (itemName != '') {
        let itemsStorage = localStorage.getItem('todo-items');
        if (itemsStorage !== null) {
            console.log("chk11111",itemsStorage);
            let itemsArr = JSON.parse(itemsStorage);
            console.log("itemsArr => ",itemsArr);
            itemsArr !== null ? itemsArr.push({ "item": itemName, "status": 0 }): [];
            saveItems(itemsArr);
            fetchItems();
            document.querySelector('.new-item input').value = ''
            document.querySelector('.new-item').style.display='none';
        }else{
            console.log("chk122222");
            let itemsArr = [];
            itemsArr.push({ "item": itemName, "status": 0 });
            saveItems(itemsArr);
            fetchItems();
            document.querySelector('.new-item input').value = ''
        }
    }
});

function fetchItems() {
    const itemList = document.querySelector('ul.todo-items');
    itemList.innerHTML = '';
    let newItemHTML = '';

    try {
        let itemsStorage = localStorage.getItem('todo-items');
        console.log("Items---->",itemsStorage);
        let itemArr = JSON.parse(itemsStorage);

        for (let i = 0; i < itemArr.length; i++) {
            let Status = ''
            if (itemArr[i].status == 1) {
                Status = 'class="done"';
            }
            if(itemArr[i].status === 1){
            newItemHTML += `<li data-itemindex="${i}" ${Status}>
            <span class="item">${itemArr[i].item}</span> 
            <div><span class="itemComplete">✍</span> <span class="itemDelete">🗑</span></div>
            </li>`;
            }else{
                newItemHTML += `<li data-itemindex="${i}" ${Status}>
            <span>${itemArr[i].item}</span> 
            <div><span class="itemComplete">✍</span> <span class="itemDelete">🗑</span></div>
            </li>`;
            }
        }
        itemList.innerHTML = newItemHTML;

        let itemListUL = document.querySelectorAll('ul li');
        for (let i = 0; i < itemListUL.length; i++) {
            itemListUL[i].querySelector('.itemComplete').addEventListener('click', function () {
                //
                let index = this.parentNode.parentNode.dataset.itemindex;
                console.log("===>index comp", index);
                itemComplete(index)
            })

            itemListUL[i].querySelector('.itemDelete').addEventListener('click', function () {
                //
                let index = this.parentNode.parentNode.dataset.itemindex;
                console.log("===>index del", index);
                itemDelete(index)
            })
        }

    } catch (e) {
        //..
    }
}

function itemComplete(index) {

    let itemsStorage = localStorage.getItem('todo-items');
    let itemsArr = JSON.parse(itemsStorage);
    console.log("Iten Complete--->",itemsArr);

    itemsArr[index].status = 1;
    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="' + index + '"]').className = 'done'; //
}

function itemDelete(index) {

    let itemsStorage = localStorage.getItem('todo-items');
    let itemArr = JSON.parse(itemsStorage);

    itemArr.splice(index, 1);

    saveItems(itemArr);

    document.querySelector('ul.todo-items li[data-itemindex="' + index + '"]').remove();
}

function saveItems(obj) {
    let string = JSON.stringify(obj);
    console.log("ssssssss", string);
    localStorage.setItem(`todo-items`, string);
}

fetchItems();