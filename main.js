"use strict";

const input = document.querySelector(".input");
const list = document.querySelector(".list-wrap");
const submitButton = document.querySelector(".submit-btn");
const hiddenMessage = document.querySelector(".hidden-msg");

document.addEventListener("DOMContentLoaded", function () {
  loadListFromLocalStorage();
  input.value = "";
});

function buildItem(todo) {
  const item = document.createElement("div");
  item.classList.add("item");
  list.appendChild(item);

  const itemName = document.createElement("h3");
  itemName.classList.add("item-name");
  itemName.textContent = todo.title;
  item.appendChild(itemName);

  const buttonWrap = document.createElement("div");
  buttonWrap.classList.add("btn-wrap");

  const doneButton = document.createElement("button");
  doneButton.classList.add("btn");
  doneButton.textContent = "done";
  buttonWrap.appendChild(doneButton);

  if (todo.isComplete) {
    itemName.classList.add("line-through");
  }

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn");
  removeButton.textContent = "remove";
  buttonWrap.appendChild(removeButton);
  item.appendChild(buttonWrap);

  doneButton.addEventListener("click", function () {
    itemName.classList.toggle("line-through");
    const doneButtonInitialText = "done";
    if (doneButton.textContent === doneButtonInitialText) {
      doneButton.textContent = "undo";
    } else {
      doneButton.textContent = doneButtonInitialText;
    }

    saveListToLocalStorage();
  });

  removeButton.addEventListener("click", function () {
    item.remove();
    saveListToLocalStorage();
  });
}

function buildList() {
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (input.value === "") {
      hiddenMessage.classList.remove("hidden");
    } else {
      buildItem({ title: input.value, isComplete: false });
      input.value = "";
      hiddenMessage.classList.add("hidden");
      saveListToLocalStorage();
    }
  });
}

function saveListToLocalStorage() {
  const items = Array.from(document.querySelectorAll(".item-name")).map(
    (item) => {
      console.log(item);
      return {
        title: item.innerHTML,
        isComplete: item.classList.contains("line-through"),
      };
    }
  );
  localStorage.setItem("myList", JSON.stringify(items));
}

function loadListFromLocalStorage() {
  const storedList = localStorage.getItem("myList");
  if (storedList) {
    const items = JSON.parse(storedList);
    items.forEach((todo) => {
      //input.value = "lol";
      console.log(input);
      buildItem(todo);
    });
  }
}

buildList();
