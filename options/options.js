let page = document.getElementById("buttonDiv");
let inp = document.getElementById("textInput");
let selectedClassName = "current";

inp.addEventListener("input", function (e) {
  const prefix = e.target.value;
  chrome.storage.sync.set({ prefix: prefix });
});

function setInp() {
  chrome.storage.sync.get("prefix", ({ prefix }) => {
    inp.value = prefix;
  });
}

setInp();
