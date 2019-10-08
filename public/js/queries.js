const Pool = require('pg').Pool
const pool = new Pool({
	user: 'finsjeiczflbmd',
	host: 'ec2-54-75-224-168.eu-west-1.compute.amazonaws.com',
	database: 'd787cuabrfetff',
	password: 'c3b4e7e6023b6b0dd3e0a1b6219233651510ebcad2edb381406cf429de4f4ecb',
	port: 5432,
})
const presenceTable = 'presence';


const getUsers = (request, response) => {
	pool.query('SELECT * FROM '+presenceTable+' ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}
const addConfirmation = (request, response) => {
	const { name, partnerName, children,
		email, phoneNumber, comingFor, foodAllergies, comments } = request.body

	pool.query('INSERT INTO '+presenceTable+' (name, partnerName, children, email, phoneNumber, comingFor, foodAllergies, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
	 [name, partnerName, children,
		email, phoneNumber, comingFor, foodAllergies, comments]
	 , (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send(`Confirmation added with ID: ${results.insertId}`)
	})
}

const createUser = (request, response) => {
	const { name, email } = request.body

	pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send(`User added with ID: ${results.insertId}`)
	})
}

const updateUser = (request, response) => {
	const id = parseInt(request.params.id)
	const { name, email } = request.body

	pool.query(
		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
		[name, email, id],
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(200).send(`User modified with ID: ${id}`)
		}
		)
}

module.exports = {
	getUsers,
	createUser,
	addConfirmation,
	updateUser,
}