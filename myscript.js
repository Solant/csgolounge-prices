/*! CSGO Lounge prices | (c)  2015 Solant */

function getPricesWithCurrency(){
	chrome.storage.sync.get({
		currency: 1
	}, function(items) {
		getPrices(items.currency);
	});
	//Instead of dom mutation event, kind of dirty hack
	setTimeout(getPricesWithCurrency, 1000);
}

getPricesWithCurrency();

function getPrices(currencyId){
	$(".item").not(":has(.value)").each(function(index){
		$(this).prepend("<div class='value'>Loading</div>");
		var itemName = $(this).children("img").attr("alt");
		if(itemName == "Any Offers" || itemName == "Any Knife" || itemName == "Any Key" || itemName == "Real Money" || itemName == "Dota Items" || itemName[0] == ":")
			return;
		var itemPrice;
		var itemUrl = "https://steamcommunity.com/market/priceoverview/?currency="+currencyId+"&appid=730&market_hash_name="+encodeURIComponent(itemName);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", itemUrl, true);
		xhr.onreadystatechange = (function(selector) {
			return function() {
				if (xhr.readyState == 4 && xhr.status != 500) {
					var json = JSON.parse(xhr.responseText);
					if(json['success']){
						if(json['lowest_price'] !== undefined)
							$(selector).children(".value").html(json['lowest_price'].replace(/[\.,]--/g, ""));
						else
							$(selector).children(".value").html("???");
					} else {
						$(selector).children(".value").html("???");
					}
				}
			}
		})(this)
		xhr.send();
	});
}