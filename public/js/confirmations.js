
class Invitation {
	constructor(id, name, partnerName, children, comments, date) {
		this.id = id;
		this.name = name;
		this.partnerName = partnerName;
		this.children = children;
		this.comments = comments;
		this.date = date;
	}
	getMainFields(){
		return [
		["name", this.name ],
		["partnerName", this.partnerName ],
		["children", this.children ],
		["comments", this.comments ]
		]
	}

	getFormattedDate(){
		var date = new Date(this.date);
		return date.toDateString();
	}
}

const Pool = require('pg').Pool
const pool = new Pool({
	user: 'finsjeiczflbmd',
	host: 'ec2-54-75-224-168.eu-west-1.compute.amazonaws.com',
	database: 'd787cuabrfetff',
	password: 'c3b4e7e6023b6b0dd3e0a1b6219233651510ebcad2edb381406cf429de4f4ecb',
	port: 5432,
})
const presenceTable = 'confirmPresence';
const absenceTable = 'confirmAbsence';


const getPresences = (request, response) => {
	pool.query('SELECT * FROM '+presenceTable+' ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
		}
		console.log("Results: "+results);
		var invitations = [];
		var i = 0;
		for(var row of results.rows){
			invitations[i++] = new Invitation(row.id, row.name, row.partnerName, row.children, row.comments, row.date);
		}
	})
}
/*
var invitations = [
new Invitation(1,"Clara Ghiurca","Ciprian Ghiurca","Larissa 2 ani","Da. Abia asteptam nunta!","2019-10-12T00:00:00.000Z"),
new Invitation(11,"Vanessa Perridy","François Bataille","","","2019-10-15T00:00:00.000Z"),
new Invitation(12,"Mihai Ilie","Alina Florina Ilie","","Cum va putem ajuta?😀😁😉","2019-10-15T00:00:00.000Z"),
];
function testInvitations(){
	var invitations = [];
	var i = 0;
	for (var j = 30; j >= 0; j--) {
		invitations[i++] = new Invitation(12,"Mihai Ilie","Alina Florina Ilie","","Cum va putem ajuta?😀😁😉","2019-10-15T00:00:00.000Z");
	}
	displayInvitations(invitations);
}*/



function displayInvitations(invitations){
	var table = document.getElementById("invitesTable");
	var rowIndex = 0;
	var body = table.createTBody();
	for (var invitation of invitations) {
		if(rowIndex == 0){
			insertHeader(invitation, table);
		}
		var row = body.insertRow(rowIndex++);
		var fields = invitation.getMainFields();

		var columnIndex = 0;
		row.insertCell(columnIndex++).outerHTML = "<th>"+rowIndex+"</th>";
		for (var [key, value] of fields) {
			row.insertCell(columnIndex++).innerHTML = value;
		}
		row.insertCell(columnIndex++).innerHTML = invitation.getFormattedDate();
	}
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