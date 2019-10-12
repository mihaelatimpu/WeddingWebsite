

function addFile(filename) {
	console.log(filename);
	elmnt = document.getElementById('content');
	/* Make an HTTP request using the attribute value as the file name: */
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				console.log("Found file");
				elmnt.innerHTML = this.responseText;
			}
			if (this.status == 404) {
				console.log("404");
				elmnt.innerHTML = "Page not found.";
			}      
			document.getElementById('invitationOptions').remove();

			startJS();
		}
	}
	xhttp.open("GET", filename, true);
	xhttp.send();

}

function renderConfirmPresenceForm(){
	addFile('confirm_presence.html');
}

function renderConfirmAbsenceForm(){
	addFile('confirm_absence.html');
}