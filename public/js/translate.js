$(function(){

	$(".dropdown-menu a").click(function(){
		var cookieValue = $(this).text();
		translatePage($(this).text());
		//document.cookie = "language="+$(this).text();
document.cookie = "lboxcook=" + encodeURIComponent(cookieValue);

   // alert('You have set the cookie: ' + $.cookie('language'));

 });
});


function getCookieData(cookie_name) {
    var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : null;
}
/*

function getCookieData( name ) {
    var pairs = document.cookie.split("; "),
        count = pairs.length, parts; 
    while ( count-- ) {
        parts = pairs[count].split("=");
        if ( parts[0] === name )
            return parts[1];
    }
    return false;
}*/

function initPage() {
	var language = getCookieData("lboxcook");
	translatePage(language);
}
function translatePage(language) {
		$("#languageDropdown").text(language);
		$("#languageDropdown").val(language);

}
initPage();