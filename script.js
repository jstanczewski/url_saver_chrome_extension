let savedLinks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));

if (linksFromLocalStorage) {
  savedLinks = linksFromLocalStorage;
  renderList();
}

function renderList() {
  let listItems = "";
  for (let i = 0; i < savedLinks.length; i++) {
    listItems += `<li><a href=${savedLinks[i]} target="_blank">${savedLinks[i]}</li>`;
  }
  ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    savedLinks.push(activeTab.url);
    inputEl.value = "";
    localStorage.setItem("myLinks", JSON.stringify(savedLinks));
    renderList();
  });
});

inputBtn.addEventListener("click", function () {
  savedLinks.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLinks", JSON.stringify(savedLinks));
  renderList();
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  savedLinks = [];
  renderList();
});
