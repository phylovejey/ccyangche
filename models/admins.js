const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	identity: {
		type: Number,
		min: 0,
		max: 2,
		default: 1
	},
}, {
	timestamps: true
});

var admins = mongoose.model('admins', adminSchema)

module.exports = admins;

