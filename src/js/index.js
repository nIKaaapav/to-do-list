const createBth = document.querySelector('#create-new-card-bth');
const input = document.querySelector('#create-new-card-input');
const containerForCard = document.querySelector('#container-cards');

if (localStorage.length!==0){
    let keysLocalStorage = Object.keys(localStorage);
    for (let key in keysLocalStorage){
        addCardInSite(localStorage.getItem(+key+1), +key+1)
    }
}

createBth.addEventListener('click', e =>{
    e.preventDefault();
    saveCardsInStorage(input.value);
    addCardInSite(input.value, localStorage.length+1)
});

function saveCardsInStorage( text) {
 localStorage.setItem(localStorage.length+1, text);
}

function addCardInSite(text, index) {
    const card = createNewCard(text, index);
    containerForCard.prepend(card);
}

function createNewCard(text, index) {
    const div = document.createElement('div');
    div.dataset.id = index;
    div.classList.add('card');
    div.innerHTML = `<p data-field-name="text">${text}</p><button data-field-name="delete" id="delete-card">delete</button><button data-field-name="edit" id="edit-card">edit</button>`;
    div.querySelector('#delete-card').addEventListener('click', deleteCard);
    div.querySelector('#edit-card').addEventListener('click', editCard);
    return div;
}

function editCard(event) {
    console.log(event.target.parentElement);
    const key  = event.target.parentElement.dataset.id;
    const text = localStorage.getItem(key);
    event.target.parentElement.innerHTML = `<input type="text" value="${text}" id="edit-input"><button onclick="saveEditCrd(event)" id="save-edit">save</button>`;
    // e.target.parentElement.querySelector('#save-edit').addEventListener('click', saveEditCrd)
}

function saveEditCrd(event) {
    event.preventDefault();
    localStorage.removeItem(event.target.parentElement.dataset.id);
    console.log(localStorage.getItem(event.target.parentElement.dataset.id));
    saveCardsInStorage(event.target.parentElement.querySelector('#edit-input').value);
    console.log(localStorage.getItem(event.target.parentElement.dataset.id));
    event.target.parentElement.innerHTML =`<p data-field-name="text">${event.target.parentElement.querySelector('#edit-input').value}</p><button data-field-name="delete" id="delete-card" onclick="deleteCard(event)">delete</button><button data-field-name="edit" id="edit-card" onclick="editCard(event)">edit</button>`;
}

function deleteCard(event) {
    event.preventDefault();
    localStorage.removeItem(event.target.parentElement.dataset.id);
    event.target.parentElement.remove();
}