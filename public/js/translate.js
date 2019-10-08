$(function(){

	$(".dropdown-menu a").click(function(){
		var cookieValue = $(this).text();
		translatePage($(this).text());
		document.cookie = "lboxcook=" + encodeURIComponent(cookieValue);

	});
});


function getCookieData(cookie_name) {
	var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
	return results ? decodeURIComponent(results[2]) : null;
}

function initPage() {
	var language = getCookieData("lboxcook");
	if(language){
		translatePage(language);
	}
}
function translatePage(language) {
	$("#languageDropdown").text(language);
	$("#languageDropdown").val(language);

}
initPage();