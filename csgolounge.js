/*! Lounge prices | (c)  2015 Solant */

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
		var itemName = $(this).children("img").attr("alt");
        var itemRarity = $(this).children(".rarity").html();
		if(itemName.startsWith("Any") || itemRarity == "Gift" || itemRarity == "Card" || itemName == "+ More"
            || itemRarity == "DLC" || itemRarity == "Background" || itemRarity == "Icon" || itemName == "Not Tradable"
            || itemName == "Dota Items" || itemName == "TF2 Items" || itemName == "Real Money")
			return;
		$(this).prepend("<div class='value'>Loading</div>");
		var itemPrice;
		var itemUrl = "https://steamcommunity.com/market/priceoverview/?currency="+currencyId+"&appid=730&market_hash_name="+encodeURIComponent(itemName);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", itemUrl, true);
		xhr.onreadystatechange = (function(selector) {
			return function() {
				if (xhr.readyState == 4) {
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
