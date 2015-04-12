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

  var selectList = $('#currencySelect option');
  selectList.sort(function(a,b){
    a = a.text;
    b = b.text;
    return a.localeCompare(b);
  });

  $('#currencySelect').html(selectList);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

$("#faq-header").click(function(){
    $("#faq-content").toggle(); 
});
