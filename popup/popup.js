let button = document.getElementById("downloadButton");
let currSetting = document.getElementById("currSettings");

chrome.storage.sync.get("prefix", ({ prefix }) => {
  // if prefix exists, prefix setting is displayed in popup
  if (prefix && prefix !== "") {
    currSetting.textContent = "Current prefix setting is: " + prefix;
  }
});

button.addEventListener("click", async () => {
  // get current tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // injects download script into website
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: downloadImages,
  });
});

function downloadImages() {
  // checks whether the script is injected in correct website
  if (
    window.location.href.includes(
      "https://hf.space/static/dalle-mini/dalle-mini/index.html"
    )
  ) {
    chrome.runtime.sendMessage(
      { content: document.body.innerHTML },
      function (response) {}
    );

    // get collection of images and their buttons by specific class
    const collection = document.getElementsByClassName("s-QzgPMAMVqUOn");
    let i = 1;

    chrome.storage.sync.get("prefix", ({ prefix }) => {
      // one by one downloads the pictures
      for (const c of collection) {
        if (c.tagName.toLocaleLowerCase().includes("img")) {
          var link = document.createElement("a");
          link.href = c.src;
          link.download = prefix + i++ + ".jpg";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    });
  } else if (
    window.location.href.includes(
      "https://huggingface.co/spaces/dalle-mini/dalle-mini"
    )
  ) {
    console.log("redirecting...");

    // redirection to correct website
    window.open(document.getElementById("iFrameResizer0").src, "_self");
  } else {
    console.log(
      "You are either on a wrong page or this page is not supported."
    );
  }
}
