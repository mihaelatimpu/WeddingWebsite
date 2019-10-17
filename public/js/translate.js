function getCookieData(cookie_name) {
	var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	return results ? decodeURIComponent(results[2]) : null;
}

var supportedLanguages = [
["ro", texts_ro],
["en", texts_en],
["fr", texts_fr]
];


function getLanguage(selectedLanguage){
	for(var [key, value]  of supportedLanguages){
		if(selectedLanguage == key){
			return value;
		}
	}
	alert(selectedLanguage + " not supported");

}

function translateTextsOnPage(selectedLanguage){
	var myMap = getLanguage(selectedLanguage);
	for (var [key, value] of myMap) {
		var list = document.getElementsByClassName(key)
		if(list.length > 0){
			list[0].innerText = value;
		}
		if(key == "text-"+selectedLanguage){
			$("#text-language")[0].innerHTML = value;
		}
	}
}



function translatePage(language) {
	document.cookie = "lboxcook=" + encodeURIComponent(language);
	translateTextsOnPage(language);

}


function translateCurrentPage() {
	// For now there is only one parameter. If we decide to add multiple parameter, 
	// this will have to be replaced with a split method
	var paramLanguage = window.location.search.replace("?lang=","");
	if(paramLanguage){
		console.log("Translating to query language: "+paramLanguage);
		translatePage(paramLanguage);
		return;
	}
	var language = getCookieData("lboxcook");
	if(language){
		console.log("Translating to cookie language: "+language);
		translatePage(language);
	} else {
		console.log("No language could be found.. Translating to default: en");
		translatePage("en");
	}
}
