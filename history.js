function writeStorageDataToTextarea(textareaId) {
  // Retrieve the URL and hash data from the Chrome sync storage
  chrome.storage.sync.get(null, (items) => {
    // Initialize an empty result string
    let result = "HASH\t\tURL\n\n";

    // Iterate over the items in the storage
    for (const key in items) {
      // Add the URL and hash to the result string
	  if (key !== "domain")
	  {result += `${items[key]}\t\t${key}\n\n`;}
    }

    // Get a reference to the textarea element
    const textarea = document.getElementById(textareaId);

    // Set the value of the textarea to the result string
    textarea.value = result;
  });
}

function clearSyncStorage(callback) {
  // Get all items to identify what to remove, preserving 'domain'
  chrome.storage.sync.get(null, (items) => {
    const keysToRemove = Object.keys(items).filter(key => key !== "domain");
    
    if (keysToRemove.length > 0) {
      chrome.storage.sync.remove(keysToRemove, callback);
    } else if (callback) {
      callback();
    }
  });
}

window.onload = function() {
  writeStorageDataToTextarea("textArea");
  document.getElementById("clear").onclick = function() {
    clearSyncStorage(function() {
      location.reload();
    });
  };
}
