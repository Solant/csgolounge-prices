chrome.storage.sync.get({
	currency: 1,
	status: true
}, function(items) {
	if(items.status == true){
		getStatuses();
	}
});

function getStatuses(){
    $("a.user").add($(".profilesmallheader").children("a")).each(function(index){
        var userId = $(this).attr("href").replace(/[^0-9]/g, "");
        var xhr = new XMLHttpRequest();
        var url = "https://steamcommunity.com/profiles/" + userId + "/?xml=1";
        xhr.open("GET", url, true);
        xhr.onreadystatechange = (function(selector){
            return function(){
                if (xhr.readyState == 4) {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
                    var state = xmlDoc.getElementsByTagName("onlineState")[0].childNodes[0].nodeValue;
                    if(state == "in-game")
                        $(selector).append("<span style=\"color: green\">online</span>");
                    else
                        $(selector).append("<span style=\"color: red\">offline</span>");
                }
            }
        })(this);
        xhr.send();
    });
}