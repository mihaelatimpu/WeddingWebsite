$(function(){

	/*$(".dropdown-menu a").click(function(){
		var cookieValue = $(this).id;
		translatePage(cookieValue);
		document.cookie = "lboxcook=" + encodeURIComponent(cookieValue);

	});*/
});


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
			list[0].innerHTML = value;
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
	var language = getCookieData("lboxcook");
	if(language){
		translatePage(language);
	}
}
