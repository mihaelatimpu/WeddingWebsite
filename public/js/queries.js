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
	var sortBy = request.query[sortBy];
	if(!sortBy){
		sortBy = "id";
	}
	pool.query('SELECT * FROM '+presenceTable+' ORDER BY '+sortBy+' DESC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getChildren = (request, response) => {
	var sortBy = request.query[sortBy];
	var sortOrder = request.query[sortOrder];
	if(!sortBy){
		sortBy = "parentId";
	}
	if(!sortOrder){
		sortOrder = "ASC";
	}
	pool.query('SELECT * FROM children ORDER BY '+sortBy+' '+sortOrder, (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getPartners = (request, response) => {
	var sortBy = request.query[sortBy];
	var sortOrder = request.query[sortOrder];
	if(!sortBy){
		sortBy = "partnerId";
	}
	if(!sortOrder){
		sortOrder = "ASC";
	}
	pool.query('SELECT * FROM partners ORDER BY '+sortBy+' '+sortOrder, (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getAbsences = (request, response) => {
	pool.query('SELECT * FROM '+absenceTable+' ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}



const path = require('path')
const addPresence = (request, response) => {
	const { name, partnerName, children,
		email, phoneNumber, comingFor, address, foodAllergies, comments } = request.body
		/*response.status(201).send(`name: `+name + ', partnerName '+partnerName +', children '+children +', email '+email +', phoneNumber '+phoneNumber
		+', comingFor '+comingFor +', address '+address +', foodAllergies '+foodAllergies +', comments '+comments)*/
		// response.status(201).send(request.body)
		var currentTime = new Date();
		pool.query('INSERT INTO '+presenceTable+' (name, partnerName, children, email, phoneNumber, comingFor, address, foodAllergies, comments, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
			[name, partnerName, children,
			email, phoneNumber, comingFor, address, foodAllergies, comments, currentTime]
			, (error, results) => {
				if (error) {
					throw error
				}
				response.sendFile(path.resolve(path.dirname(require.main.filename) + '/public/pages/form_success.html'));
			})

	}


	const addAbsence = (request, response) => {
		const { name, reason } = request.body
		/*response.status(201).send(`name: `+name + ', reason '+reason)*/
		// response.status(201).send(request.body)
		var currentTime = new Date();
		pool.query('INSERT INTO '+absenceTable+' (name, reason, date) VALUES ($1, $2, $3)',
			[name, reason, currentTime]
			, (error, results) => {
				if (error) {
					throw error
				}
				response.sendFile(path.resolve(path.dirname(require.main.filename) + '/public/pages/form_absence_success.html'));
			})

	}

	module.exports = {
		getChildren,
		getPartners,
		getPresences,
		getAbsences,
		addPresence,
		addAbsence
	}