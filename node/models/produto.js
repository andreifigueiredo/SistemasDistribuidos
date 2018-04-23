var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/api');
var Schema = mongoose.Schema;

var produtoSchema = new Schema({
	nome: String
});

module.exports = mongoose.model('produto', produtoSchema);;