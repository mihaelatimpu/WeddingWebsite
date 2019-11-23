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
	const confirmationsURL = "https://mihaela-et-seb.herokuapp.com/confirmations";
	const partnersURL = "https://mihaela-et-seb.herokuapp.com/partners";
	const childrenURL = "https://mihaela-et-seb.herokuapp.com/children";

	document.getElementById("mainValuesTable").style.visibility = "hidden";
	document.getElementById("invitesTable").style.visibility = "hidden";
	document.getElementById("spinner").style.visibility = "";

	console.log("Getting confirmations..");
	$.get(confirmationsURL, function(invites, status1){

		console.log("Getting partners..");
		$.get(partnersURL, function(partners, status2){

			console.log("Getting children..");
			$.get(childrenURL, function(children, status3){
				updateMainValues(invites, partners, children);
				generateInvitations(invites, partners, children);
			});
		});

	});
}

function updateMainValues(invites, partners, children){
	document.getElementById("singles").innerText = (invites.length - partners.length) + " singles";
	document.getElementById("couples").innerText = (partners.length) + " couples";
	document.getElementById("adults").innerText = (invites.length + partners.length) + " adults";
	document.getElementById("children").innerText = (children.length) + " children";
	document.getElementById("total").innerText = (invites.length + partners.length + children.length) + " guests";

	document.getElementById("mainValuesTable").style.visibility = "";
	document.getElementById("invitesTable").style.visibility = "";
	document.getElementById("spinner").style.visibility = "hidden";
}

function generateInvitations(invites, partners, children){

	console.log(partners);
	var invitations = [];
	var i = 0;
	for(var row of invites){
		var invitation = new Invitation();
		invitation.id = row.id;
		invitation.name = row.name;
		invitation.partnerName = getPartner(partners, row.id);
		invitation.children = getChildren(children, row.id);
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
}
function getPartner(partners, inviteId){
	for(var item of partners){
		if(item.partnerid == inviteId){
			return item.name;
		}
	}
	return "";
}
function getChildren(children, inviteId){
	var childString = "";
	for(var child of children){
		if(child.parentid == inviteId){
			var string = child.name + "("+child.age+")";
			if(childString){
				childString += ", "+string;
			} else {
				childString = string;
			}
		}
	}
	return childString;
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
		row.insertCell(columnIndex++).outerHTML = "<th>"+invitation.id+"</th>";
		//row.insertCell(columnIndex++).outerHTML = "<th>"+rowIndex+"</th>";
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