function save_options() {
  var e = document.getElementById("currencySelect");
  var currency = e.options[e.selectedIndex].value;
  chrome.storage.sync.set({
    currency: currency
  }, function() {
		$("#saved").fadeIn('slow').delay(1000).hide(0);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    currency: 1
  }, function(items) {
    document.getElementById('currencySelect').value = items.currency;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);