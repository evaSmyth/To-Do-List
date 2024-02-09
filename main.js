'use strict'


const input = document.querySelector('.input');
const list = document.querySelector('.list-wrap')
const submitButton = document.querySelector('.submit-btn')
const hiddenMessage = document.querySelector('.hidden-msg');

document.addEventListener('DOMContentLoaded', function () {
  loadListFromLocalStorage();
});


function buildItem () {
  const item = document.createElement('div')
  item.classList.add('item');
  list.appendChild(item);
  const itemName = document.createElement('h3');
  itemName.classList.add('item-name');
  itemName.textContent = input.value;
  item.appendChild(itemName);
  const buttonWrap = document.createElement('div');
  buttonWrap.classList.add('btn-wrap')
  const doneButton = document.createElement('button');
  doneButton.classList.add('btn')
  doneButton.textContent = 'done'
  buttonWrap.appendChild(doneButton)
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn')
  removeButton.textContent = 'remove';
  buttonWrap.appendChild(removeButton);
  item.appendChild(buttonWrap);

    doneButton.addEventListener('click', function() {
      itemName.classList.toggle('line-through');
      doneButton.classList.toggle('line-through');

      saveListToLocalStorage();
    });

    removeButton.addEventListener('click', function() {
      item.remove();
      saveListToLocalStorage();
    })
};


function buildList () {
  submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    if(input.value === '') {
    hiddenMessage.classList.remove('hidden');
  } else {
    buildItem();
    input.value = '';
    hiddenMessage.classList.add('hidden');
    saveListToLocalStorage();
    }
  });
};

function saveListToLocalStorage() {
  const items = Array.from(document.querySelectorAll('.item-name')).map(item => item.textContent);
  localStorage.setItem('myList', JSON.stringify(items));
}

function loadListFromLocalStorage() {
  const storedList = localStorage.getItem('myList');
  if (storedList) {
    const items = JSON.parse(storedList);
    items.forEach(itemText => {
      input.value = itemText;
      buildItem();
    });
  }
}
buildList();











