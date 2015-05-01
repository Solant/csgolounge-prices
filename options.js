function save_options() {
  var e = document.getElementById("currencySelect");
  var currency = e.options[e.selectedIndex].value;
  chrome.storage.sync.set({
    currency: currency,
    status: document.getElementById("onlineStatusCheckbox").checked
  }, function() {
		$("#saved").fadeIn('slow').delay(1000).hide(0);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    currency: 1,
    status: true
  }, function(items) {
    document.getElementById('currencySelect').value = items.currency;
    document.getElementById("onlineStatusCheckbox").checked = items.status;
  });

  var selectList = $('#currencySelect option');
  selectList.sort(function(a,b){
    a = a.text;
    b = b.text;
    return a.localeCompare(b);
  });

  $('#currencySelect').html(selectList);
  $('#currencyLabel').text(chrome.i18n.getMessage("currency"));
  $('#save').text(chrome.i18n.getMessage("save"));
  $('#onlineStatusLabel').text(chrome.i18n.getMessage('onlineStatus'));
  $('#faq-header').text(chrome.i18n.getMessage("faqHeader")).css("font-weight", "Bold");
  $('#faq-content').html(chrome.i18n.getMessage("faqContent"));
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

$("#faq-header").click(function(){
    $("#faq-content").toggle(); 
});
