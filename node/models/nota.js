var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/api');
var Schema = mongoose.Schema;

var notaSchema = new Schema({
	mat: String,
	cod_disc: String,
	nota: Number,
});

module.exports = mongoose.model('nota', notaSchema);;