class Invitation {
	constructor() {
	}
	getMainFields(){
		return [
		["name", this.name ],
		["partnerName", this.partnerName ],
		["children", this.children ]
		]
	}

	getFormattedDate(){
		var date = new Date(this.date);
		return date.toDateString();
	}
	getFormattedString(){
		return ""
		+"name: "+this.name+"\n"
		+"partnerName: "+this.partnerName+"\n"
		+"children: "+this.children+"\n"
		+"email: "+this.email+"\n"
		+"phoneNumber: "+this.phoneNumber+"\n"
		+"comingFor: "+this.comingFor+"\n"
		+"address: "+this.address+"\n"
		+"foodAllergies: "+this.foodAllergies+"\n"
		+"comments: "+this.comments+"\n"
		+"date: "+this.getFormattedDate()+"\n"
		+"";
	}
}

function getPresences() {
	const url = "https://mihaela-et-seb.herokuapp.com/confirmations";
	$.get(url, function(data, status){
		console.log(data);
		var invitations = [];
		var i = 0;
		for(var row of data){
			var invitation = new Invitation();
			invitation.id = row.id;
			invitation.name = row.name;
			invitation.partnerName = row.partnername;
			invitation.children = row.children;
			invitation.email = row.email;
			invitation.phoneNumber = row.phonenumber;
			invitation.comingFor = row.comingfor;
			invitation.address = row.address;
			invitation.foodAllergies = row.foodallergies;
			invitation.comments = row.comments;
			invitation.date = row.date;
			invitations[i++] = invitation;
		}
		displayInvitations(invitations);
	});
}

function getChildNumber(node) {
	return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}
function displayInvitations(invitations){
	var table = document.getElementById("invitesTable");
	var rowIndex = 0;
	var body = table.createTBody();
	for (var invitation of invitations) {
		if(rowIndex == 0){
			insertHeader(invitation, table);
		}
		var row = body.insertRow(rowIndex++);

		row.addEventListener("click", function(){
			var index = getChildNumber(this);
			showDetails(invitations[index]);
		});

		var fields = invitation.getMainFields();

		var columnIndex = 0;
		row.insertCell(columnIndex++).outerHTML = "<th>"+rowIndex+"</th>";
		for (var [key, value] of fields) {
			row.insertCell(columnIndex++).innerHTML = value;
		}
		row.insertCell(columnIndex++).innerHTML = invitation.getFormattedDate();
	}
}

function showDetails(invitation){
	alert(invitation.getFormattedString());
}


function insertHeader(invitation, table){
	var header = table.createTHead();
	var row = header.insertRow(0); 
	var fields = invitation.getMainFields();   
	var columnIndex = 0;
	row.insertCell(columnIndex++).outerHTML = "<th>#</th>";
	for (var [key, value] of fields) {
		row.insertCell(columnIndex++).outerHTML = "<th>"+key+"</th>"; 
	}
	row.insertCell(columnIndex++).outerHTML = "<th>date</th>";
}

getPresences();